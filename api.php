<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$dataFile = 'db.json';

// Инициализация файла данных
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode(['games' => []]));
}

// Чтение данных
$data = json_decode(file_get_contents($dataFile), true);

// Разбор пути запроса
$method = $_SERVER['REQUEST_METHOD'];
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = trim(str_replace('/api.php', '', $requestUri), '/');
$segments = explode('/', $path);

// Обработка OPTIONS запросов
if ($method === 'OPTIONS') {
    exit;
}

// Обработка маршрутов
try {
    if ($segments[0] === 'games') {
        $id = $segments[1] ?? null;
        
        switch ($method) {
            case 'GET':
                if ($id) {
                    foreach ($data['games'] as $game) {
                        if ($game['id'] == $id) {
                            echo json_encode($game);
                            exit;
                        }
                    }
                    http_response_code(404);
                    echo json_encode(['error' => 'Game not found']);
                } else {
                    echo json_encode($data['games']);
                }
                break;

            case 'POST':
                $input = json_decode(file_get_contents('php://input'), true);
                if (empty($input['title'])) {
                    throw new Exception('Title is required');
                }
                
                // Генерация ID
                $ids = array_column($data['games'], 'id');
                $newId = $ids ? max($ids) + 1 : 1;
                
                $newGame = [
                    'id' => $newId,
                    'title' => $input['title']
                ];
                
                $data['games'][] = $newGame;
                file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
                echo json_encode($newGame);
                break;

            case 'DELETE':
                if (!$id) {
                    throw new Exception('ID required');
                }
                
                $found = false;
                foreach ($data['games'] as $key => $game) {
                    if ($game['id'] == $id) {
                        unset($data['games'][$key]);
                        $data['games'] = array_values($data['games']);
                        $found = true;
                        break;
                    }
                }
                
                if ($found) {
                    file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
                    echo json_encode(['success' => true]);
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'Game not found']);
                }
                break;

            case 'PATCH':
                if (!$id) {
                    throw new Exception('ID required');
                }
                
                $input = json_decode(file_get_contents('php://input'), true);
                if (empty($input['title'])) {
                    throw new Exception('Title is required');
                }
                
                foreach ($data['games'] as &$game) {
                    if ($game['id'] == $id) {
                        $game['title'] = $input['title'];
                        file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
                        echo json_encode($game);
                        exit;
                    }
                }
                
                http_response_code(404);
                echo json_encode(['error' => 'Game not found']);
                break;

            default:
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
        }
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}