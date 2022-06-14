import { useCallback, useEffect } from "react";
import {
  MapContainer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import { PlaceType } from "../../types/place";
import { MarkerPopup } from "./MarkerPopup";
import { MapLayer } from "../MapLayer";
import { POSITION_CENTER } from "../../constants";
import { getPlaceAdress } from "../../requestApi";
import "leaflet/dist/leaflet.css";
import '../../index.css';

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

export const Map = ({selectPosition, handleSetPosition}: MapProps) => {
  const locationSelection: LatLngTuple = [Number(selectPosition.lat), Number(selectPosition.lon)];

  return (
    <MapContainer
      center={POSITION_CENTER}
      zoom={8}
    >
      <MapLayer />
      {selectPosition && (
        <Marker position={locationSelection} icon={icon}>
          <MarkerPopup selectPosition={selectPosition} />
        </Marker>
      )}
      <MapEvents selectPosition={selectPosition} handleSetPosition={handleSetPosition} />
    </MapContainer>
  );
}