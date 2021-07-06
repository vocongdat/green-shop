import { handleShowProduct } from './showProducts.js';
import { $, $$ } from './variables.js';

export const handlePagination = async (paginate, page) => {
    const paginationBlock = document.querySelector('.pagination');
    const totalProducts = paginate._totalRow;
    const limits = paginate._limit;
    var paginationNumber = 1;
    totalProducts <= limits
        ? paginationNumber
        : (paginationNumber = Math.round(totalProducts / limits));

    let htmlPagination = [];
    for (let i = 1; i <= paginationNumber; i++) {
        let paginationNumber = `
                <li class="pagination-number">
                    <button class="btn btn--paginate">${i}</button>
                </li>
            `;
        htmlPagination.push(paginationNumber);
    }

    paginationBlock.innerHTML = htmlPagination.join('');
    const listPagination = $$('.pagination-number .btn--paginate');
    listPagination.forEach((pageNumber) => {
        if (Number(pageNumber.textContent) === page) {
            pageNumber.classList.add('btn--active');
        }
    });
};

export const renderPagination = () => {
    const paginationBlock = document.querySelectorAll('.pagination-number');
    if (paginationBlock) {
        paginationBlock.forEach((item) => {
            item.addEventListener('click', () => {
                const pageNumber = Number(item.textContent);
                const value = item.querySelector('.btn--paginate').textContent;
                handleShowProduct(pageNumber);
            });
        });
    }
};
