import { getDataLocal } from './getDataLocal.js';
import handleInputQuantity from './inputQuantity.js';
import { getAllProducts } from './API/productsApi.js';
import toast from './toast-message.js';
import { $, $$, formatNumber } from './variables.js';
import { handlePayment } from './handleCSS.js';

const handleCart = async () => {
    const dataProducts = await getAllProducts();
    const productsList = dataProducts.body;
    const objectProductCart = getDataLocal('productID');

    const tableCart = $('.cart__table');
    const bodyCartTable = tableCart.querySelector('tbody');

    let html = '';
    if (objectProductCart && objectProductCart.length != 0) {
        let array = [];
        for (let product of objectProductCart) {
            const itemProduct = productsList.map((element) => {
                if (element.id === product.id) {
                    const totalCash = formatNumber(
                        product.quantity * element.price
                    );

                    html = `
                        <tr class="cart--wrap">
                            <th class="cart__body-img" scope="col" data-label="${element.name}">
                                <a href="/products-detail.html?id=${product.id}">
                                    <img
                                        class="cart__img"
                                        src="./assets/img/product/${element.thumbnailUrl}"
                                        alt="${element.name}"
                                /></a>
                            </th>
                            <td class="cart__name" data-label="Tên sản phẩm">
                                <a href="/products-detail.html?id=${product.id}">${element.name}</a>
                            </td>
                            <td data-label="Đơn giá" class="product-price" data-price="${element.price}">${element.price}.000 đ</td>
                            <td class="quantity" data-label="Số lượng">
                                <span class="quantity--esc id="${product.id}"><i class="fas fa-minus"></i></span>
                                <input class="quantity--input" type="number" min="1" max=${element.quantity} value="${product.quantity}" onkeypress='validateNumber(event)'>
                                <span class="quantity--desc id="${product.id}"><i class="fas fa-plus"></i></span>
                            </td>
                            <td data-label="Thành tiền" class="product-cash-total">${totalCash}.000 đ</td>
                            <td data-label="Xóa" data-id="${product.id}" class="product--delete">
                                <i class="fas fa-trash-alt cart__icon--trash"></i>
                            </td>
                        </tr>
                        `;
                    array.push(html);
                }
            });
            bodyCartTable.innerHTML = array.join('');
            handleInputQuantity();
        }
    } else {
        html = 'Giỏ hàng trống';
        bodyCartTable.innerHTML = html;

        const cancelButtonElement = $('.btn--cancel');
        const payButtonElement = $('.btn--pay');

        cancelButtonElement.classList.add('btn--disabled');
        payButtonElement.classList.add('btn--disabled');
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    const cancelButtonElement = $('.btn--cancel');
    const paymentButtonElement = $('.btn--pay');

    handleCash();
    handleCart();
    handlePayment();
    document.addEventListener('click', () => {
        handleCash();
    });

    cancelButtonElement.addEventListener('click', () => {
        if (!cancelButtonElement.classList.contains('btn--disabled')) {
            const isValid = confirm('Bạn có chắc chắn hủy toàn bộ đơn hàng');
            if (isValid) {
                localStorage.clear();

                handleCart();

                toast({
                    title: 'Hủy đơn hàng!',
                    message:
                        'Bạn đã xóa toàn bộ sản phẩm trong sản phẩm giỏ hàng',
                    type: 'info',
                    duration: 3000,
                });
            }
        }
    });
    paymentButtonElement.addEventListener('click', () => {
        if (!cancelButtonElement.classList.contains('btn--disabled')) {
            const elementsFormPay = $('.main');
            elementsFormPay.classList.add('display');
            const formElement = elementsFormPay.querySelector('.overplay');
            formElement.classList.add('display-block');

            const isValid = elementsFormPay.classList.contains('display');
            if (isValid) {
                formElement.addEventListener('click', () => {
                    formElement.classList.remove('display-block');
                    elementsFormPay.classList.remove('display');
                });
            }
        }
    });
});

const handleCash = async () => {
    const totalCash = $('#total-cash');
    const VAT = $('#vat');
    const totalPay = $('#total-pay');

    const dataProducts = await getAllProducts();
    const productsList = dataProducts.body;
    const objectProductCart = getDataLocal('productID');
    let total = 0;
    if (objectProductCart && objectProductCart.length > 0) {
        for (let element of objectProductCart) {
            var data = productsList.map((product) => {
                if (product.id === element.id) {
                    return (total = total + element.quantity * product.price);
                }
            });
        }
    }
    const formatTotalCash = formatNumber(total);
    const formatVat = formatNumber((total * 10) / 100);
    const formatTotalPay = formatNumber((total * 10) / 100 + total);

    totalCash.textContent = `${formatTotalCash}.000 đ`;
    VAT.textContent = `${formatVat}.000 đ`;
    totalPay.textContent = `${formatTotalPay}.000 đ`;
};

export { handleCart, handleCash };
