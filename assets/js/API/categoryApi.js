import { customFetch } from './fetchClient.js';

const API = 'https://congdat.herokuapp.com/api/';

export const getCategory = async () => customFetch(API + 'categories');
