import L from 'leaflet';

export const IconsMap = {
  markerIcon: L.icon({
    iconUrl: './placeholder.png',
    iconSize: [38, 38],
  }),
  homeIcon: L.icon({
    iconUrl: './house.png',
    iconSize: [38, 38],
  }),
  pointIcon: L.icon({
    iconUrl: './point.png',
    iconSize: [38, 38],
    className: 'point-icon'
  })
};
