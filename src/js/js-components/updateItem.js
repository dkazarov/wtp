import { fetchData, renderData } from './fetchAndRenderData';

const listUl = document.querySelector('.list ul');

// Обработчик клика на кнопку редактирования
listUl.addEventListener('click', async e => {
	if (e.target.classList.contains('edit-btn')) {
		const editBtn = e.target;
		const listItem = editBtn.closest('li');
		const gameId = editBtn.dataset.id;

		// ИСПРАВЛЕНИЕ 1: Правильный выбор элемента с названием
		const titleNode = listItem.querySelector('.game-title') || listItem.firstChild;

		const input = document.createElement('input');
		input.type = 'text';
		input.classList.add('edit-input');
		input.value = titleNode.textContent.trim();
		titleNode.replaceWith(input);
		input.focus();

		const handleEditEnd = async () => {
			input.removeEventListener('blur', handleEditEnd);
			input.removeEventListener('keydown', handleKeyPress);

			const newTitle = input.value.trim();

			if (newTitle && newTitle !== titleNode.textContent.trim()) {
				try {
					// ИСПРАВЛЕНИЕ 2: Добавляем await для обновления
					await updateItem(gameId, newTitle);

					// ИСПРАВЛЕНИЕ 3: Обновляем данные после успешного запроса
					const updatedData = await fetchData();
					renderData(updatedData);
				} catch (error) {
					console.error('Ошибка:', error);
					input.replaceWith(titleNode);
					alert('Ошибка обновления!');
				}
			} else {
				input.replaceWith(titleNode);
			}
		};

		const handleKeyPress = e => {
			if (e.key === 'Enter') {
				e.preventDefault();
				handleEditEnd();
			}
			if (e.key === 'Escape') {
				input.replaceWith(titleNode);
			}
		};

		input.addEventListener('blur', handleEditEnd);
		input.addEventListener('keydown', handleKeyPress);
	}
});

// ИСПРАВЛЕНИЕ 4: Добавляем обязательные заголовки и тело запроса
export const updateItem = async (id, newTitle) => {
	const response = await fetch(`http://localhost:3000/games/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			title: newTitle, // Убедитесь что сервер ожидает это поле
		}),
	});

	if (!response.ok) throw new Error(`HTTP error! ${response.status}`);

	return await response.json();
};
