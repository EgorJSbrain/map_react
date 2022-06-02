import { useCallback, useEffect } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import './map.css'
import { getPlaceAdress } from "../../clientApi";
import { PlaceType } from "../../types/place";
import { MarkerPopup } from "./MarkerPopup";
import { POSITION_CENTER } from "../../constants/global";

const icon = L.icon({
  iconUrl: "./placeholder.png",
  iconSize: [38, 38],
});

type MapProps = {
  handleSetPosition: (position: PlaceType) => void;
  selectPosition: PlaceType;
}

const MapEvents = ({selectPosition, handleSetPosition}: MapProps) => {
  const map = useMap();

  const setCenter = (lat: number, lng: number) => {
    map.setView(
      L.latLng(lat, lng),
      map.getZoom(),
      {
        animate: true
      }
    )
  };

  useEffect(() => {
    if (selectPosition) {
      setCenter(Number(selectPosition.lat), Number(selectPosition.lon));
    }
  }, [selectPosition]);

  const handleMapClick = useCallback(async (e: L.LeafletMouseEvent) => {
    try {
      const { lat, lng } = e.latlng;
      setCenter(lat, lng);

      const currentPlace: PlaceType = await getPlaceAdress(lat, lng);

      if (currentPlace && currentPlace.address) {
        handleSetPosition(currentPlace);
      }
    } catch (e) {
      console.log(e)
    }
  }, []);

  useMapEvents({
    click: handleMapClick,
  });

  return null;
}
const k = process.env
console.log("🚀 ~ file: Map.tsx ~ line 68 ~ k", k)
export const Map = ({selectPosition, handleSetPosition}: MapProps) => {
  const locationSelection: LatLngTuple = [Number(selectPosition.lat), Number(selectPosition.lon)];

  return (
    <MapContainer
      center={POSITION_CENTER}
      zoom={8}
    >
      <TileLayer
         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         url="https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=hbtgKuT3RSXT7vjDhc1z"
      />
      {selectPosition && (
        <Marker position={locationSelection} icon={icon}>
          <MarkerPopup selectPosition={selectPosition} />
        </Marker>
      )}
      <MapEvents selectPosition={selectPosition} handleSetPosition={handleSetPosition} />
    </MapContainer>
  );
}