import { burgerOpen, burgerClose } from './js-components/burger';
import { fetchData } from './js-components/fetchAndRenderData';
import { deleteAction } from './js-components/deleteItem';
import { postData } from './js-components/postData';


const listUl = document.querySelector('.list ul');


// Отримати данні
fetchData();
// Видалити
deleteAction();

burgerOpen();
burgerClose();
