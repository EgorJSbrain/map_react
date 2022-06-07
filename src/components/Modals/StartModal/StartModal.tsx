import {
  Box,
  Button,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { authAPI } from "../../../services/AuthService";
import { UserType } from "../../../types";
import { LogIn } from "./LogIn";
import { SignUp } from "./SignUp";
import { ToggleButtons } from "./ToggleButtons";
import { UserModalForm } from "./UserModalForm";
import { UserModalStepper } from "./UserModalStepper";

export enum ContentTypes {
  buttons = 'buttons',
  signUp = 'sign-up',
  logIn = 'log-in',
};

type UserModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const ContentWrapper = styled(Box)`
  width: 480px;
  padding: 0 24px 24px 24px;
`;

export const StartModal = ({ isOpen, handleClose }: UserModalProps) => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const [logInRequest, { isLoading, error, data }] = authAPI.useFetchLogInMutation()
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<UserType>({
    mode: "onChange",
  });

  const [contentType, setContentType] = useState<string>(ContentTypes.buttons);

  const isBtns = contentType === ContentTypes.buttons;
  const isSignUp = contentType === ContentTypes.signUp;
  const isLogIn = contentType === ContentTypes.logIn;

  useEffect(() => {
    if (data) {
      navigation("/search");
    }
  }, [data]);

  const onSubmit = useCallback((data: UserType) => {
    logInRequest({
      password: data.password,
      email: data.email,
    })
  }, []);

  const handleSetType = useCallback((value: string) => {
    setContentType(value);
  }, []);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{t("modals.userModal.title")}</DialogTitle>
      <ContentWrapper>
        {isBtns && <ToggleButtons handleSetType={handleSetType} />}
        {!isBtns && (
          <form onSubmit={handleSubmit(onSubmit)}>
            {isSignUp && (
              <SignUp control={control} isValid={isValid} translate={t} />
            )}
            {isLogIn && (
              <LogIn control={control} isValid={isValid} translate={t} />
            )}
          </form>
        )}
      </ContentWrapper>
    </Dialog>
  );
};
