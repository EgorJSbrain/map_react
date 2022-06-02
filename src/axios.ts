import axios from "axios";

export const instance = axios.create({
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