import {
  Box,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useAppDispatch } from "../../../hooks/redux";
import { authAPI } from "../../../services/AuthService";
import { userAPI } from "../../../services/UserService";
import { UserType } from "../../../types";
import { PlaceType } from "../../../types/place";
import { LogIn } from "./LogIn";
import { SignUp } from "./SignUp";
import { ToggleButtons } from "./ToggleButtons";

export enum ContentTypes {
  buttons = 'buttons',
  signUp = 'sign-up',
  logIn = 'log-in',
};

type UserModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export type UserFormType = {
  firstName: string;
  secondName: string;
  address: string;
  email: string;
  password: string;
}

const ContentWrapper = styled(Box)`
  width: 480px;
  padding: 0 24px 24px 24px;
`;

export const StartModal = ({ isOpen, handleClose }: UserModalProps) => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const {
    control,
    formState: { isValid },
    handleSubmit,
    setValue,
  } = useForm<UserFormType>({
    mode: "onChange",
  });

  const [contentType, setContentType] = useState<string>(ContentTypes.buttons);
  const [userAddress, setUserAddress] = useState<PlaceType | null>(null)

  const [logIn, { data }] = authAPI.useFetchLogInMutation()
  const [signUp, { data: signUpData }] = userAPI.useFetchSignUpMutation()

  const isBtns = contentType === ContentTypes.buttons;
  const isSignUp = contentType === ContentTypes.signUp;
  const isLogIn = contentType === ContentTypes.logIn;

  useEffect(() => {
    if (data) navigation('/search');
    if (signUpData) handleClose();
  }, [data, signUpData]);

  const onSubmit = useCallback(
    (data: UserFormType) => {
      try {
        if (isLogIn) {
          logIn({
            password: data.password,
            email: data.email,
          });

        } else {
          signUp({
            ...data,
            address: userAddress,
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    [logIn, isLogIn, userAddress]
  );

  const handleSetType = useCallback((value: string) => {
    setContentType(value);
  }, []);

  const handleSetUserAddress = (address: PlaceType) => {
    setUserAddress(address);
    setValue('address', address.display_name);
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{t("modals.userModal.title")}</DialogTitle>
      <ContentWrapper>
        {isBtns && <ToggleButtons handleSetType={handleSetType} />}

        {!isBtns && (
          <form onSubmit={handleSubmit(onSubmit)}>
            {isSignUp && (
              <SignUp
                control={control}
                isValid={isValid}
                translate={t}
                handleSetUserAddress={handleSetUserAddress}
              />
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
