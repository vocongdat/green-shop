const getDataLocal = (key) => {
    const dataLocal = localStorage.getItem(key);
    return JSON.parse(dataLocal);
};

export { getDataLocal };
