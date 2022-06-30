import { useCallback, useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { PlaceType } from "../../types/place";
import { placeApi } from "../../requestApi";

interface MapEventsProps {
  homePosition: PlaceType | null;
  selectPosition: PlaceType | null;
  handleSetPosition: (position: PlaceType) => void;
}

export const MapEvents = ({
  selectPosition,
  homePosition,
  handleSetPosition,
}: MapEventsProps) => {
  const map = useMap();

  const setCenter = useCallback(
    (lat: number, lng: number) => {
      map.setView(L.latLng(lat, lng), map.getZoom(), {
        animate: true,
      });
    },
    [map]
  );

  useEffect(() => {
    if (homePosition) {
      setCenter(Number(homePosition?.lat), Number(homePosition?.lon));
    }
  }, [homePosition, setCenter]);

  useEffect(() => {
    if (selectPosition) {
      setCenter(Number(selectPosition.lat), Number(selectPosition.lon));
    }
  }, [selectPosition, homePosition, setCenter]);

  const handleMapClick = useCallback(
    async (e: L.LeafletMouseEvent) => {
      try {
        const { lat, lng } = e.latlng;
        setCenter(lat, lng);

        const currentPlace: PlaceType = await placeApi.getPlaces(lat, lng);

        if (currentPlace && currentPlace.address) {
          handleSetPosition(currentPlace);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    },
    [handleSetPosition, setCenter]
  );

  useMapEvents({
    click: handleMapClick,
  });

  return null;
};
