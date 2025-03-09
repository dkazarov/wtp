import { fetchData } from './fetchAndRenderData';

const randomItem = document.querySelector('.random-btn');
const headerItem = document.querySelector('header h1');

export const getRandomGame = () => {
	randomItem.addEventListener('click', async () => {
		try {
			const data = await fetchData();

			if (!data?.length) {
				throw new Error('Игры не найдены');
			}

			const randomIndex = Math.floor(Math.random() * data.length);
			console.log(randomIndex);
			const randomGame = data[randomIndex];

			headerItem.textContent = randomGame.title;
			return randomGame;
		} catch (error) {
			console.error('Ошибка при выборе игры:', error.message);
			return null;
		}
	});
};
