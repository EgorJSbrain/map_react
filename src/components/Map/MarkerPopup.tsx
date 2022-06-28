import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Popup } from "react-leaflet";
import { PlaceType } from "../../types/place"
import { Delete, Description, Edit, IconsWrapper } from "./styled";


type MarkerPopupProps = {
  selectPosition: PlaceType;
  description?: string;
  id?: number;
  handlePointDelete?: (id: number) => void;
}

export const MarkerPopup = ({
  selectPosition,
  description,
  id,
  handlePointDelete
}: MarkerPopupProps) => {
  const { t } = useTranslation();

  return (
    <Popup>
      <Box>
        {`${selectPosition.address.country || ""}${
          selectPosition.address.city ? ", " + selectPosition.address.city : ""
        }${selectPosition.address.town ? ", " + selectPosition.address.town : ""}${
          selectPosition.address.village
            ? ", " + selectPosition.address.village
            : ""
        }`}
      </Box>

      <Description>
        {description}
      </Description>

      {id && handlePointDelete && <IconsWrapper>
        <Edit>{t('edit')}</Edit>
        <Delete onClick={() => handlePointDelete(id)}>{t('delete')}</Delete>
      </IconsWrapper>}
    </Popup>
  )
};
