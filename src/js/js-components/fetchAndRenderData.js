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
	data.forEach(data => {

		listUl.insertAdjacentHTML(
			'beforeend',
			`
		<li>${data.title}
			<div class="edit-inner">
				<button class="edit-btn action-btn btn--reset">✎</button>
				<button class="delete-btn action-btn btn--reset" data-id=${data.id}>&#10006</button>
			</div>
		</li>
		`,
		);
	});
};
