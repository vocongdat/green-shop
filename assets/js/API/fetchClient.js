export const customFetch = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log('Failed to fetch products: ', err);
    }
};
