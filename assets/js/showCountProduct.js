import { getDataLocal } from './getDataLocal.js';

document.addEventListener('DOMContentLoaded', async () => {
    const productsCount = getDataLocal('productID');
    const qtnElement = document.querySelector('.qnt');
    if (productsCount) {
        qtnElement.textContent = productsCount.length;
    } else {
        qtnElement.textContent = 0;
    }
});
document.addEventListener('click', async () => {
    const productsCount = getDataLocal('productID');
    const qtnElement = document.querySelector('.qnt');
    if (productsCount) {
        qtnElement.textContent = productsCount.length;
    } else {
        qtnElement.textContent = 0;
    }
});
