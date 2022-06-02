import { Popup } from "react-leaflet";
import { PlaceType } from "../../types/place"

type MarkerPopupProps = {
  selectPosition: PlaceType
}

export const MarkerPopup = ({ selectPosition }: MarkerPopupProps) => (
  <Popup>
    {`${selectPosition.address.country || ""}${
      selectPosition.address.city ? ", " + selectPosition.address.city : ""
    }${selectPosition.address.town ? ", " + selectPosition.address.town : ""}${
      selectPosition.address.village
        ? ", " + selectPosition.address.village
        : ""
    }`}
  </Popup>
);
