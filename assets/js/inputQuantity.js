import getParent from './getParent.js';
import { $, $$, formatNumber } from './variables.js';
import { getDataLocal } from './getDataLocal.js';
import { handleCart } from './handleCart.js';

const handleCash = (elementProduct, valueQuantity) => {
    const cashElement = elementProduct.querySelector('.product-cash-total');
    const priceProductElement = elementProduct.querySelector('.product-price');
    const priceProduct = priceProductElement.getAttribute('data-price');
    const cashPrice = formatNumber(valueQuantity.value * priceProduct);
    cashElement.textContent = `${cashPrice}.000 đ`;
};

const handleDeleteProduct = (paramElement) => {
    const dataLocalString = getDataLocal('productID');
    const idProductElement = paramElement.querySelector('.product--delete');
    idProductElement.addEventListener('click', () => {
        const idProduct = idProductElement.getAttribute('data-id');
        const id = dataLocalString.filter((product) => {
            return product.id != idProduct;
        });
        localStorage.setItem('productID', JSON.stringify(id));
        handleCart();
    });
};

const handleInputQuantity = () => {
    const inputQuantityElements = $$('.quantity--input');
    const quantityDesc = $$('.quantity--desc');
    const quantityEsc = $$('.quantity--esc');

    const dataLocal = getDataLocal('productID');

    inputQuantityElements.forEach((element) => {
        element.onblur = () => {
            const parentProduct = getParent(element, 'tr');
            const quantityInputElement =
                parentProduct.querySelector('.quantity--input');
            quantityInputElement.value;
            handleCash(parentProduct, quantityInputElement);
            const id = parentProduct
                .querySelector('.product--delete')
                .getAttribute('data-id');
            dataLocal.forEach((product) => {
                if (product.id === id) {
                    return (product.quantity = Number(
                        quantityInputElement.value
                    ));
                }
            });
            localStorage.setItem('productID', JSON.stringify(dataLocal));
        };
        element.onchange = () => {
            console.log(element.value);
        };
    });
    quantityDesc.forEach((descBtn) => {
        const parentProduct = getParent(descBtn, 'tr');
        descBtn.addEventListener('click', () => {
            const quantityInputElement =
                parentProduct.querySelector('.quantity--input');
            quantityInputElement.value++;
            handleCash(parentProduct, quantityInputElement);
            const id = parentProduct
                .querySelector('.product--delete')
                .getAttribute('data-id');
            dataLocal.forEach((product) => {
                if (product.id === id) {
                    return (product.quantity = Number(
                        quantityInputElement.value
                    ));
                }
            });
            localStorage.setItem('productID', JSON.stringify(dataLocal));
        });
        handleDeleteProduct(parentProduct);
    });
    quantityEsc.forEach((escBtn) => {
        escBtn.addEventListener('click', () => {
            const parentProduct = getParent(escBtn, 'tr');
            const quantityInputElement =
                parentProduct.querySelector('.quantity--input');
            if (quantityInputElement.value > 0) {
                quantityInputElement.value--;
            }
            handleCash(parentProduct, quantityInputElement);
            const id = parentProduct
                .querySelector('.product--delete')
                .getAttribute('data-id');
            dataLocal.forEach((product) => {
                if (product.id === id) {
                    return (product.quantity = Number(
                        quantityInputElement.value
                    ));
                }
            });
            localStorage.setItem('productID', JSON.stringify(dataLocal));
        });
    });
};

export default handleInputQuantity;
