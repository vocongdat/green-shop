import { $, $$ } from './variables.js';

const inputQuantity = () => {
    const inputQuantityElements = $('.quantity--input');
    const quantityDesc = $('.quantity--desc');
    const quantityEsc = $('.quantity--esc');

    quantityDesc.addEventListener('click', () => {
        inputQuantityElements.value++;
    });
    quantityEsc.addEventListener('click', () => {
        if (inputQuantityElements.value > 0) {
            inputQuantityElements.value--;
        }
    });
};

export { inputQuantity };
