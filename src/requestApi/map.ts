import { mapInstance } from "../axios";

export const searchPlaces = async (searchText: string) => {
  const { data } = await mapInstance.get("search", {
    params: {
      q: searchText,
    },
  });

  return data;
};

export const getPlaceAdress = async (lat: number, lon: number) => {
  const { data } = await mapInstance.get("reverse", {
    params: {
      lat,
      lon,
    },
  });

  return data;
};
