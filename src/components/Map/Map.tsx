import { MapContainer, Marker } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { PlaceType } from "../../types/place";
import { MapLayer } from "../MapLayer";
import { POSITION_CENTER } from "../../constants";
import { PointType } from "../../types";
import { MapEvents } from "./MapEvents";
import { IconsMap } from "./IconsMap";
import { MarkerPopup } from "./MarkerPopup";
import "../../index.css";
import "leaflet/dist/leaflet.css";

interface MapProps {
  homePosition: PlaceType | null;
  selectPosition: PlaceType | null;
  points: PointType[];
  handleSetPosition: (position: PlaceType) => void;
  handlePointDelete: (id: number) => void;
  handlePointEdit: (point: PointType) => void;
  handleCardCreate: (point: PointType) => void;
}

export const Map = ({
  selectPosition,
  homePosition,
  points,
  handleSetPosition,
  handlePointDelete,
  handlePointEdit,
  handleCardCreate,
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
          <MarkerPopup point={selectPosition} />
        </Marker>
      )}

      {homePosition && (
        <Marker position={homeLocation} icon={IconsMap.homeIcon}>
          <MarkerPopup point={homePosition} />
        </Marker>
      )}

      {points &&
        points.map((point) => {
          const pointLocation: LatLngTuple = [
            Number(point?.lat),
            Number(point?.lon),
          ];

          return (
            <Marker
              key={point.id}
              position={pointLocation}
              icon={IconsMap.pointIcon}
            >
              <MarkerPopup
                point={point}
                handlePointDelete={handlePointDelete}
                handlePointEdit={handlePointEdit}
                handleCardCreate={handleCardCreate}
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
