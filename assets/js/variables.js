const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const API = 'https://congdat.herokuapp.com/api/';
const formatNumber = (value) => {
    const fixedValue = value.toFixed(0);
    return new Intl.NumberFormat().format(fixedValue);
};

export { $, $$, API, formatNumber };
