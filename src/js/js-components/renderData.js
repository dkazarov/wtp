const listUl = document.querySelector('.list ul');

export const fetchData = async () => {
	window.addEventListener('DOMContentLoaded', async () => {
		const response = await fetch('http://localhost:3000/games');

		if (!response.ok) {
			throw new Error('Ошибка запроса' + response.status);
		}

		const data = await response.json();

		renderData(data);
	});
};

export const renderData = data => {
	listUl.textContent = '';

	data.forEach(element => {
		const listLi = document.createElement('li');
		listLi.classList.add('list-item');
		listLi.textContent = element.title;

		listUl.appendChild(listLi);
	});
};
