import { useCallback } from "react";
import { Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { UserModalForm } from "./UserModalForm";
import { PlaceType } from "../../../types/place";
import { ContentTypes } from "./StartModal";
import { useAppDispatch } from "../../../hooks";
import { CentredWrapper, LinkBox, LinkBoxInfo } from "./StartModal.styled";
import { userRegister } from "../../../store/actions";

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
  const form = useForm<UserFormType>({
    mode: "onChange",
  });

  const onSubmit = useCallback(
    async (data: UserFormType) => {
        const response = await dispatch(userRegister(data));

        if (response.payload) {
          handleClose();
        }
    },
    [handleClose, dispatch]
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <UserModalForm />

        <CentredWrapper>
          <Button sx={{ mb: 2 }} disabled={!form.formState.isValid} type="submit">
            {t("signUpBtn")}
          </Button>
        </CentredWrapper>

        <CentredWrapper>
          <LinkBoxInfo>{t("existedAccaunt")}</LinkBoxInfo>
          <LinkBox onClick={() => handleSetType(ContentTypes.logIn)}>
            {t("logInBtn")}
          </LinkBox>
        </CentredWrapper>
      </form>
    </FormProvider>
  );
};
