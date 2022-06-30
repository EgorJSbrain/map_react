import axios from "axios";

export const mapBaseUrl = "https://nominatim.openstreetmap.org";
export const baseUrl = "http://localhost:3008";

export const instanceMapApi = axios.create({
  baseURL: mapBaseUrl,
});

instanceMapApi.interceptors.request.use((config) => {
  config.params = {
    format: "json",
    addressdetails: "1",
    polygon_geojson: "0",
    ...config.params,
  };

  return config;
});

export const instanceApi = axios.create({
  baseURL: baseUrl,
});
