import { renderData, fetchData } from './fetchAndRenderData';

const listUl = document.querySelector('.list ul');

// Обробник видалення (делегировання події)
export const deleteAction = async () => {
	listUl.addEventListener('click', async e => {
		if (e.target.classList.contains('delete-btn')) {
			const id = e.target.dataset.id;
			
			try {
				if (confirm('Видалити гру?')) {
					await deleteItem(id);
					// Після видалення обновлюємо данні
					const updatedData = await fetchData();
					renderData(updatedData);
				}
			} catch (error) {
				console.error('Ошибка удаления:', error);
			}
		}
	});
};

// Функція видалення на сервері
export const deleteItem = async id => {
	const response = await fetch(`http://localhost:3000/games/${id}`, {
		method: 'DELETE',
	});
	if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
};
