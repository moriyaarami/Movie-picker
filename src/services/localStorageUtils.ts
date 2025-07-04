export const saveToLocalStorage = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getFromLocalStorage = <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

export const removeFromLocalStorage = (key: string): void => {
    localStorage.removeItem(key);
}