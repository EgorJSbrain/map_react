import {
  Box,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useAppDispatch } from "../../../hooks/redux";
import { fetchAllUsers } from "../../../store/actions/users";
import { ModalDialog } from "../../ModalDialog";
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

const ContentWrapper = styled(Box)`
  width: 480px;
  padding: 0 24px 24px 24px;
`;

export const StartModal = ({ isOpen, handleClose }: UserModalProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [contentType, setContentType] = useState<string>(ContentTypes.buttons);

  const isBtns = contentType === ContentTypes.buttons;
  const isSignUp = contentType === ContentTypes.signUp;
  const isLogIn = contentType === ContentTypes.logIn;

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleSetType = useCallback((value: string) => {
    setContentType(value);
  }, []);

  return (
    <ModalDialog
      title={t("modals.userModal.title")}
      onClose={handleClose}
      open={isOpen}
    >
      <ContentWrapper>
        {isBtns && <ToggleButtons handleSetType={handleSetType} />}

        {!isBtns && (
          <>
            {isSignUp && (
              <SignUp
                handleClose={handleClose}
                handleSetType={handleSetType}
              />
            )}

            {isLogIn && <LogIn handleSetType={handleSetType} />}
          </>
        )}
      </ContentWrapper>
    </ModalDialog>
  );
};
