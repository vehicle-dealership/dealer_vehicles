import { AxiosError } from "axios";
import { api } from "./api";

export const KenzieKarsBase = "https://kenzie-kars.herokuapp.com/cars";

export interface iError {
  message: string;
}

export const getBrands = async () => {
  try {
    const res = await api.get(KenzieKarsBase);
    return res.data;
  } catch (error) {
    const currentError = error as AxiosError<iError>;
    console.error(currentError.message);
  }
};

export const getModelsByBrand = async (brand: string) => {
  try {
    const res = await api.get(`${KenzieKarsBase}/?brand=${brand}`);

    return res.data;
  } catch (error) {
    const currentError = error as AxiosError<iError>;
    console.error(currentError.message);
  }
};
