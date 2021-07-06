import { customFetch } from './fetchClient.js';
import { API } from '../variables.js';

const getAllProducts = async () => customFetch(API + 'products');
const getProducts = async (page = 1, limit = 6) =>
    customFetch(`${API}products?_page=${page}&_limit=${limit}`);

const getOneProduct = async (id) => customFetch(`${API}products?id=${id}`);

const getSliceProduct = async (start = 1, end = 7) =>
    customFetch(`${API}products?_start=${start}&_end=${end}`);

const getProductByCategory = async (id) =>
    customFetch(`${API}products?categoryId=${id}&_page=1&_limit=6`);

const getProductByPrice = async (gte, lte) =>
    customFetch(
        `${API}products?price_gte=${gte}&price_lte=${lte}&_page=1&_limit=6`
    );

const getProductByColor = async (color) =>
    customFetch(`${API}products?color=${color}&_page=1&_limit=6`);

export {
    getAllProducts,
    getProducts,
    getOneProduct,
    getSliceProduct,
    getProductByCategory,
    getProductByPrice,
    getProductByColor,
};
