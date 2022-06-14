import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../hooks";
import { fetchAllUsers } from "../../../store/actions/users";
import { ModalDialog } from "../../ModalDialog";
import { LogIn } from "./LogIn";
import { SignUp } from "./SignUp";
import { ContentWrapper } from "./styled";

export enum ContentTypes {
  signUp = 'sign-up',
  logIn = 'log-in',
};

type UserModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export const StartModal = ({ isOpen, handleClose }: UserModalProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [contentType, setContentType] = useState<string>(ContentTypes.logIn);

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
        {isSignUp && (
          <SignUp handleClose={handleClose} handleSetType={handleSetType} />
        )}

        {isLogIn && <LogIn handleSetType={handleSetType} />}
      </ContentWrapper>
    </ModalDialog>
  );
};
