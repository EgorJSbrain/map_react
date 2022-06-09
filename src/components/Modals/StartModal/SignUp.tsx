import { useState } from "react";
import { Box, Button } from "@mui/material";
import { Control } from "react-hook-form";
import { TFunction } from "react-i18next";
import styled from "styled-components";
import { UserType } from "../../../types";
import { UserModalForm } from "./UserModalForm";
import { UserModalStepper } from "./UserModalStepper";
import { PlaceType } from "../../../types/place";
import { UserFormType } from "./StartModal";

const STEPS_AMOUNT = 3;

const ButtonsBlock = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

type SignUpProps = {
  control: Control<UserFormType, any>;
  isValid: boolean;
  translate: TFunction<"translation", undefined>;
  handleSetUserAddress: (address: PlaceType) => void;
};

export const SignUp = ({
  control,
  isValid,
  translate,
  handleSetUserAddress,
}: SignUpProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const handleNext = () => {
    let newSkipped = skipped;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <UserModalStepper activeStep={activeStep} />
      <UserModalForm
        tabIndex={activeStep}
        control={control}
        translate={translate}
        handleSetUserAddress={handleSetUserAddress}
      />

      <ButtonsBlock>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          {translate("backBtn")}
        </Button>
        {activeStep !== STEPS_AMOUNT - 1 && (
          <Button onClick={handleNext}>{translate("nextBtn")}</Button>
        )}

        {activeStep === STEPS_AMOUNT - 1 && (
          <Button disabled={!isValid} type="submit">
            {translate("finishBtn")}
          </Button>
        )}
      </ButtonsBlock>
    </>
  );
};
