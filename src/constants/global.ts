import { LatLngLiteral } from "leaflet";

export const position: number[] = [51.505, -0.09];
export const POSITION_CENTER: LatLngLiteral = { lat: 51.505, lng: -0.09 };
export const MAP_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
export const MAP_URL = `https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=${process.env.REACT_APP_KEY_MAP}`;
