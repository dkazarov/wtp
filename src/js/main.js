import { burgerOpen, burgerClose } from './js-components/burger';
import { fetchData, renderData } from './js-components/fetchAndRenderData';
import { deleteAction } from './js-components/deleteItem';
import { postData } from './js-components/postData';
import { updateItem } from './js-components/updateItem';
import { getRandomGame } from './js-components/randomItem';


// Случайная игра
getRandomGame();

// Видалити
deleteAction();

burgerOpen();
burgerClose();
