import { Box, Button, Dialog, DialogTitle, Step, StepButton, StepIcon, StepLabel, Stepper, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const steps = ['Your name', 'Your location', 'Your credentials'];

type UserModalProps = {
  isOpen: boolean;
  handleClose: () => void;
}

const ContentWrapper = styled(Box)`
  padding: 0 24px 24px 24px;
`

const DialogStepper = styled(Stepper)`
  .MuiSvgIcon-root {
    color: #88f1ff;
  }

  .MuiStepLabel-iconContainer {

    .Mui-active,
    .Mui-completed {
        color: #ffe108;
    }

    .MuiStepIcon-text {
      fill: #1d1a39;
    }
  }
`

export const UserModal = ({ isOpen, handleClose }: UserModalProps) => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  // const isStepSkipped = (step: number) => {
  //   return skipped.has(step);
  // };

  const handleNext = () => {
    let newSkipped = skipped;
    // if (isStepSkipped(activeStep)) {
    //   newSkipped = new Set(newSkipped.values());
    //   newSkipped.delete(activeStep);
    // }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle>{t("modals.userModal.title")}</DialogTitle>
      <ContentWrapper>
      <DialogStepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step key={label} {...stepProps} className={stepProps.completed ? 'compl' : ''}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </DialogStepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </ContentWrapper>
    </Dialog>
  );
};