import {
  MapContainer,
  Marker,
} from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { PlaceType } from "../../types/place";
import { MarkerPopup } from "./MarkerPopup";
import { MapLayer } from "../MapLayer";
import { POSITION_CENTER } from "../../constants";
import { PointType } from "../../types";
import { MapEvents } from "./MapEvents";
import { IconsMap } from "./IconsMap";
import '../../index.css';
import "leaflet/dist/leaflet.css";
import { useCallback } from "react";

interface MapProps {
  homePosition: PlaceType | null;
  selectPosition: PlaceType | null;
  points: PointType[];
  handleSetPosition: (position: PlaceType) => void;
  handlePointDelete: (id: number) => void;
}

export const Map = ({
  selectPosition,
  homePosition,
  points,
  handleSetPosition,
  handlePointDelete,
}: MapProps) => {
  const selectedLocation: LatLngTuple = [
    Number(selectPosition?.lat),
    Number(selectPosition?.lon),
  ];
  const homeLocation: LatLngTuple = [
    Number(homePosition?.lat),
    Number(homePosition?.lon),
  ];

  return (
    <MapContainer center={POSITION_CENTER} zoom={8}>
      <MapLayer />

      {selectPosition && (
        <Marker position={selectedLocation} icon={IconsMap.markerIcon}>
          <MarkerPopup selectPosition={selectPosition} />
        </Marker>
      )}

      {homePosition && (
        <Marker position={homeLocation} icon={IconsMap.homeIcon}>
          <MarkerPopup selectPosition={homePosition} />
        </Marker>
      )}

      {points &&
        points.map((point) => {
          const pointLocation: LatLngTuple = [
            Number(point?.place.lat),
            Number(point?.place.lon),
          ];

          return (
            <Marker
              key={point.id}
              position={pointLocation}
              icon={IconsMap.pointIcon}
            >
              <MarkerPopup
                selectPosition={point.place}
                description={point.description}
                id={point.id}
                handlePointDelete={handlePointDelete}
              />
            </Marker>
          );
        })}

      <MapEvents
        homePosition={homePosition}
        selectPosition={selectPosition}
        handleSetPosition={handleSetPosition}
      />
    </MapContainer>
  );
};