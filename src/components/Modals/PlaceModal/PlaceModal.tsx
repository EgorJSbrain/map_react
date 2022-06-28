import { Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TextFieldForm } from "../..";
import { useAppDispatch } from "../../../hooks";
import { pointCreate, pointEdit } from "../../../store/actions";
import { PointType } from "../../../types";
import { PlaceType } from "../../../types/place";
import { ModalDialog } from "../../ModalDialog";
import { CentredWrapper, PlaceName } from "./styled";

interface PlaceModalProps {
  isOpen: boolean;
  selectedPosition: PlaceType | null;
  editedPoint: PointType | null;
  handleClose: () => void;
}

export const PlaceModal = ({
  isOpen,
  selectedPosition,
  editedPoint,
  handleClose,
}: PlaceModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (editedPoint) {
      setDescription(editedPoint.description);
    }

    if (selectedPosition) {
      setDescription("");
    }
  }, [editedPoint, selectedPosition]);

  const handlePoinCreate = useCallback(async () => {
    try {
      if (selectedPosition) {
        dispatch(
          pointCreate({
            ...selectedPosition,
            description,
          })
        );
      }

      if (editedPoint) {
        dispatch(
          pointEdit({
            ...editedPoint,
            description,
          })
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      handleClose();
      setDescription("");
    }
  }, [selectedPosition, editedPoint, description]);

  const handleChange = useCallback((value: string) => {
    setDescription(value);
  }, []);

  return (
    <ModalDialog
      title={t(editedPoint ? "modals.placeModal.editTitle" : "modals.placeModal.createTitle")}
      onClose={handleClose}
      open={isOpen}
    >
      <PlaceName>
        {editedPoint
          ? editedPoint.display_name
          : selectedPosition?.display_name}
      </PlaceName>

      <TextFieldForm
        value={description}
        label={t("description")}
        isRequired={false}
        onChange={handleChange}
      />

      <CentredWrapper>
        <Button onClick={handlePoinCreate}>{t(editedPoint ? "edit" : "create")}</Button>
      </CentredWrapper>
    </ModalDialog>
  );
};
