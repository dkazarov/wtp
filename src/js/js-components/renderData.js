const listUl = document.querySelector('.list ul');

// Ініціалізація при завантаженні сторінки
window.addEventListener('DOMContentLoaded', async () => {
	try {
		const initialData = await fetchData();
		renderData(initialData);
	} catch (error) {
		console.error('Ошибка загрузки данных:', error);
	}
});

// Функция отримання даних
export const fetchData = async () => {
	const response = await fetch('http://localhost:3000/games');

	if (!response.ok) throw new Error(`HTTP error! ${response.status}`);

	return await response.json();
};

// Функція відмалювання даних
export const renderData = data => {
	if (!listUl) {
		console.error('Элемент .list ul не найден!');
		return;
	}

	listUl.innerHTML = ''; // Очищуємо список
	data.forEach(game => {
		const li = document.createElement('li');
		li.classList.add('list-item');
		li.textContent = game.title;
		listUl.appendChild(li);
	});
};
