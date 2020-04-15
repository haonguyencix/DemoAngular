export const setLocalStorage = (key: string, attr: any) => {
    return localStorage.setItem(key, JSON.stringify(attr));
};

export const getLocalStorage = (key: string) => {
    if (!localStorage.getItem(key)) {
        return null;
    } else {
        return JSON.parse(localStorage.getItem(key));
    }
};