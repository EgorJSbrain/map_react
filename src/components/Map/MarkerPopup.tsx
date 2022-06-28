import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Popup } from "react-leaflet";
import { PointType } from "../../types";
import { PlaceType } from "../../types/place"
import { Delete, Description, Edit, IconsWrapper } from "./styled";


type MarkerPopupProps = {
  // selectPosition: PlaceType;
  // description?: string;
  // id?: number;
  point: PlaceType | PointType;
  handlePointDelete?: (id: number) => void;
  handlePointEdit?: (point: PointType) => void;
}

export const MarkerPopup = ({
  point,
  handlePointDelete,
  handlePointEdit,
}: MarkerPopupProps) => {
  const { t } = useTranslation();

  return (
    <Popup>
      <Box>
        {`${point.address.country || ""}${
          point.address.city ? ", " + point.address.city : ""
        }${point.address.town ? ", " + point.address.town : ""}${
          point.address.village
            ? ", " + point.address.village
            : ""
        }`}
      </Box>

      <Description>
        {('description' in point) && point.description}
      </Description>

      {('id' in point) && handlePointDelete && handlePointEdit && <IconsWrapper>
        <Edit onClick={() => handlePointEdit(point as PointType)}>{t('edit')}</Edit>
        <Delete onClick={() => handlePointDelete(point.id)}>{t('delete')}</Delete>
      </IconsWrapper>}
    </Popup>
  )
};
