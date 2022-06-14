import { useCallback, useState } from "react";
import { Button } from "@mui/material";
import { useForm, useFormState } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { UserModalForm } from "./UserModalForm";
import { PlaceType } from "../../../types/place";
import { ContentTypes } from "./StartModal";
import { addUser } from "../../../store/actions";
import { useAppDispatch } from "../../../hooks";
import { CentredWrapper, LinkBox, LinkBoxInfo } from "./styled";

export type UserFormType = {
  firstName: string;
  secondName: string;
  address: string;
  email: string;
  password: string;
}

type SignUpProps = {
  handleClose: () => void;
  handleSetType: (type: string) => void;
};

export const SignUp = ({
  handleClose,
  handleSetType,
}: SignUpProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const {
    control,
    formState: { isValid },
    handleSubmit,
    setValue,
  } = useForm<UserFormType>({
    mode: "onChange",
  });
  const { dirtyFields } = useFormState({control});

  const [userAddress, setUserAddress] = useState<PlaceType | null>(null);

  const onSubmit = useCallback(
    async (data: UserFormType) => {
      if (userAddress) {
        const response = await dispatch(
          addUser({
            ...data,
            address: userAddress,
          })
        );

        if (response.payload) {
          handleClose();
        }
      }
    },
    [userAddress, handleClose, dispatch]
  );

  const handleSetUserAddress = (address: PlaceType | null) => {
    if (address) {
      setUserAddress(address);
      setValue('address', address.display_name);
    } else {
      setUserAddress(null);
      setValue('address', '', {shouldDirty: true});
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UserModalForm
        control={control}
        translate={t}
        handleSetUserAddress={handleSetUserAddress}
        dirtyFields={dirtyFields}
      />
      <CentredWrapper>
        <Button sx={{mb: 2}} disabled={!isValid} type="submit">
          {t("logInBtn")}
        </Button>
      </CentredWrapper>

      <CentredWrapper>
        <LinkBoxInfo>{t("existedAccaunt")}</LinkBoxInfo>
        <LinkBox onClick={() => handleSetType(ContentTypes.logIn)}>{t("logInBtn")}</LinkBox>
      </CentredWrapper>
    </form>
  );
};
