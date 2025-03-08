import { renderData, fetchData } from './fetchAndRenderData';
const addDataBtn = document.querySelector('form button');
const input = document.querySelector('form input');

// Обработчик отправки формы
addDataBtn.addEventListener('click', async e => {
	e.preventDefault();

	if (!input.value.trim()) {
		alert('Введите название игры');
		return;
	}

	try {
		await postData();
		const updatedData = await fetchData(); // Получаем новые данные
		renderData(updatedData); // Отрисовываем обновленные данные
		input.value = '';
	} catch (error) {
		console.error('Ошибка:', error);
		alert('Не удалось добавить игру');
	}
});

// Функция отправки данных
export const postData = async () => {
	const response = await fetch('http://localhost:3000/games', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			title: input.value.trim(),
		}),
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
};
