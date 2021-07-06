import {
    getProductByCategory,
    getProductByPrice,
    getProductByColor,
} from './API/productsApi.js';
import { getCategory } from './API/categoryApi.js';
import { renderGridProducts, renderListProducts } from './renderLayout.js';
import { handlePagination, renderPagination } from './paginate.js';

const renderCategories = async () => {
    const listCategoriesBlock = document.querySelector(
        '.product-list .category__list'
    );
    const dataCategories = await getCategory();
    const categoriesList = dataCategories.body;
    let htmls = categoriesList.map((item) => {
        return `
            <li class="category__item" data-id="${item.id}">
                <input
                    id="${item.id}"
                    type="radio"
                    name="product-category"
                    value="${item.id}"
                />
                <label class="category__item-title" for="${item.id}"
                    ><i class="fas fa-angle-right"></i
                    ><span class="category__item-name">${item.name}</span
                    ><span class="category__item-qnt">( 10 )</span></label
                >
            </li>
        `;
    });
    listCategoriesBlock.innerHTML = htmls.join('');
    handleFilter();
};

const handleCategoriesProduct = (dataProducts) => {
    const productsList = dataProducts.body;
    const paginateProduct = dataProducts.pagination;
    renderGridProducts(productsList);
    renderListProducts(productsList);
    handlePagination(paginateProduct);
    renderPagination();
};

const handleFilter = async () => {
    const categoriesElement = await document.getElementsByClassName(
        'category__item'
    );
    for (let element of categoriesElement) {
        element.addEventListener('click', async () => {
            const dataID = element.getAttribute('data-id');

            if (dataID) {
                const dataProducts = await getProductByCategory(dataID);
                handleCategoriesProduct(dataProducts);
            }

            const gte = element.getAttribute('data-gte');
            const lte = element.getAttribute('data-lte');
            if (gte && lte) {
                const dataProducts = await getProductByPrice(gte, lte);
                console.log(gte, lte);
                handleCategoriesProduct(dataProducts);
            }
            const color = element.getAttribute('data-color');
            if (color) {
                const dataProducts = await getProductByColor(color);
                handleCategoriesProduct(dataProducts);
            }
        });
    }
};

export { renderCategories };
