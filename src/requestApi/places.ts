import { instanceMapApi } from "../axios";

export const placeApi = {
  search: async (searchText: string) => {
    const { data } = await instanceMapApi.get("search", {
      params: {
        q: searchText,
      },
    });

    return data;
  },
  getPlaces: async (lat: number, lon: number) => {
    const { data } = await instanceMapApi.get("reverse", {
      params: {
        lat,
        lon,
      },
    });

    return data;
  },
};
