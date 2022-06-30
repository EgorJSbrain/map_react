import { TileLayer } from 'react-leaflet';
import { MAP_ATTRIBUTION, MAP_URL } from '../constants';

export const MapLayer = () => (
  <TileLayer
    attribution={MAP_ATTRIBUTION}
    url={MAP_URL}
  />
);
