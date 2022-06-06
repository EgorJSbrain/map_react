import {
  Box,
  Button,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { UserForm } from "../../../types";
import { UserModalForm } from "./UserModalForm";
import { UserModalStepper } from "./UserModalStepper";

const STEPS_AMOUNT = 3;

type UserModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const ContentWrapper = styled(Box)`
width: 420px;
  padding: 0 24px 24px 24px;
`;

const ButtonsBlock = styled(Box)`
  display: flex;
  justify-content: space-between;
`

export const UserModal = ({ isOpen, handleClose }: UserModalProps) => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<UserForm>({
    mode: "onChange",
  });

  const handleNext = () => {
    let newSkipped = skipped;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = useCallback((data: UserForm) => {
    localStorage.setItem('user', JSON.stringify(data));
    handleClose();
  }, []);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{t("modals.userModal.title")}</DialogTitle>
      <ContentWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <UserModalStepper activeStep={activeStep} />
          <>
            <UserModalForm tabIndex={activeStep} control={control} translate={t} />

            <ButtonsBlock>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                {t("backBtn")}
              </Button>
              {activeStep !== STEPS_AMOUNT - 1 && (
                <Button onClick={handleNext}>{t("nextBtn")}</Button>
              )}

              {activeStep === STEPS_AMOUNT - 1 && (
                <Button disabled={!isValid} type="submit">
                  {t("finishBtn")}
                </Button>
              )}
            </ButtonsBlock>
          </>
        </form>
      </ContentWrapper>
    </Dialog>
  );
};
