import { URL_API } from "../config/const";

export const searchApi = async (query: string): Promise<any> => {
  const path = `/api/items?q=${query}`;
  const res = await fetch(URL_API + path, {
    method: "GET"
  });
  return await res.json();
};
export const searchIdApi = async (id: string): Promise<any> => {
  const path = `/api/items/${id}`;
  try {
    const res = await fetch(`${URL_API + path}`, {
      method: "GET"
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
