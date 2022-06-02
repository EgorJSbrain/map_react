import { instance } from "./axios";

export const searchPlaces = async (searchText: string) => {
  const { data } = await instance.get("search", {
    params: {
      q: searchText,
    },
  });

  return data;
};

export const getPlaceAdress = async (lat: number, lon: number) => {
  const { data } = await instance.get("reverse", {
    params: {
      lat,
      lon,
    },
  });

  return data;
};
