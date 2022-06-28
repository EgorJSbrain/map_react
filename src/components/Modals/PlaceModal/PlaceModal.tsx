import { Button } from "@mui/material";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { TextFieldForm } from "../..";
import { useAppDispatch } from "../../../hooks";
import { pointsApi } from "../../../requestApi";
import { pointCreate } from "../../../store/actions/points";
import { PlaceType } from "../../../types/place";
import { ModalDialog } from "../../ModalDialog";
import { CentredWrapper, PlaceName } from "./styled";

interface PlaceModalProps {
  isOpen: boolean;
  selectedPosition: PlaceType;
  handleClose: () => void;
}

export const PlaceModal = ({isOpen, selectedPosition, handleClose}: PlaceModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState<string>('');

  const handlePoinCreate = useCallback(async () => {
    try {
      dispatch(pointCreate({
        place: selectedPosition,
        description,
      }))

    } catch (err) {
      console.log(err);
    } finally {
      handleClose();
      setDescription('');
    }
  }, [selectedPosition, description]);

  const handleChange = useCallback((value: string) => {
    setDescription(value);
  }, []);

  return (
    <ModalDialog
      title={t("modals.placeModal.title")}
      onClose={handleClose}
      open={isOpen}
    >
      <PlaceName>
        {selectedPosition.display_name}
      </PlaceName>

      <TextFieldForm
        value={description}
        label={t("description")}
        isRequired={false}
        onChange={handleChange}
      />

      <CentredWrapper>
        <Button onClick={handlePoinCreate}>{t("create")}</Button>
      </CentredWrapper>
    </ModalDialog>
  );
};
