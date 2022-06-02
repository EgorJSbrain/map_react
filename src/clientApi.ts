import axios from "axios";

const instance = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org',
});

instance.interceptors.request.use((config) => {
  config.params = {
    format: "json",
    addressdetails: '1',
    polygon_geojson: '0',
    ...config.params,
  }

  return config;
});

export const searchPlaces = async (searchText: string) => {
  const { data } = await instance.get("search", {
    params: {
      q: searchText,
    },
  });

  return data;
};

export const getPlaceAdress = async (lat: number, lng: number) => {
  const { data } = await instance.get("reverse", {
    params: {
      lat,
      lon: lng,
    },
  });

  return data;
};
