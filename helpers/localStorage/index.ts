export const saveItem = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getItem = async (key: string) => {
  const item = (await localStorage.getItem(key)) as string;
  return JSON.parse(item);
};

export const deleteItem = (key: string) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const themeTo = (theme: string) => {
      if(theme !== 'light' && theme !== 'dark'){
            throw new Error('Theme must be either light or dark');
      }
      if(localStorage.getItem('theme') === null) {
            localStorage.setItem('theme', theme);
      } else {
            localStorage.theme = theme;
      }
}