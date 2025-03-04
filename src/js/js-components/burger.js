const burger = document.querySelector('.burger');
const burgerLine = document.querySelector('.burger__line');
const nav = document.querySelector('.nav');
const body = document.querySelector('body');
const navItem = document.querySelectorAll('.nav__item');

export const burgerOpen = () => {
	burger.addEventListener('click', () => {
		burgerLine.classList.toggle('line--hide');
		burger.classList.toggle('burger--transform');
		nav.classList.toggle('nav--hide');
		body.classList.toggle('no-scroll');
	});
};

export const burgerClose = () => {
	navItem.forEach(el => {
		el.addEventListener('click', () => {
			burgerLine.classList.remove('line--hide');
			burger.classList.remove('burger--transform');
			nav.classList.remove('nav--hide');
			body.classList.remove('no-scroll');
		});
	});
};
