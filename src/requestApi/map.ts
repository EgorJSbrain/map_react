import { instanceMapApi } from "../axios";

export const searchPlaces = async (searchText: string) => {
  const { data } = await instanceMapApi.get("search", {
    params: {
      q: searchText,
    },
  });

  return data;
};

export const getPlaceAdress = async (lat: number, lon: number) => {
  const { data } = await instanceMapApi.get("reverse", {
    params: {
      lat,
      lon,
    },
  });

  return data;
};
