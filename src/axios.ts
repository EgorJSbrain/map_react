import axios from "axios";

export const mapInstance = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org',
});

mapInstance.interceptors.request.use((config) => {
  config.params = {
    format: "json",
    addressdetails: '1',
    polygon_geojson: '0',
    ...config.params,
  }

  return config;
});

export const instance = axios.create({
  baseURL: 'http://localhost:3008',
});
