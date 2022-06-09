import { Step, StepLabel, Stepper } from "@mui/material";
import styled from "styled-components";

const steps = ['', '', ''];

type UserModalStepperProps = {
  activeStep: number;
}

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

export const UserModalStepper = ({activeStep}: UserModalStepperProps) => {
  return (
    <DialogStepper activeStep={activeStep}>
      {steps.map((label, index) => {
        const stepProps: { completed?: boolean } = {};
        const labelProps: {
          optional?: React.ReactNode;
        } = {};

        return (
          <Step
            key={index}
            {...stepProps}
          >
            <StepLabel {...labelProps} />
          </Step>
        );
      })}
    </DialogStepper>
  );
};