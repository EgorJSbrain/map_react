import { useCallback, useEffect, useState } from "react";
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
  address: PlaceType;
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

  const onSubmit = useCallback(
    async (data: UserFormType) => {
        const response = await dispatch(addUser(data));

        if (response.payload) {
          handleClose();
        }
    },
    [handleClose, dispatch]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UserModalForm
        control={control}
        // @ts-ignore
        dirtyFields={dirtyFields}
        setValue={setValue}
      />
      <CentredWrapper>
        <Button sx={{mb: 2}} disabled={!isValid} type="submit">
          {t("signUpBtn")}
        </Button>
      </CentredWrapper>

      <CentredWrapper>
        <LinkBoxInfo>{t("existedAccaunt")}</LinkBoxInfo>
        <LinkBox onClick={() => handleSetType(ContentTypes.logIn)}>{t("logInBtn")}</LinkBox>
      </CentredWrapper>
    </form>
  );
};
