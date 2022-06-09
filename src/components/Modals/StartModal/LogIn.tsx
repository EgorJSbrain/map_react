import { Button, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { TFunction } from "react-i18next";
import styled from "styled-components";
import { UserType } from "../../../types";

const TextFieldForm = styled(TextField)`
  width: 100%;
  margin-bottom: 24px !important;

  .MuiFormLabel-asterisk {
    color: #d32f2f;
  }
`;

const LogInBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`

type LogInProps = {
  control: Control<any, any>;
  isValid: boolean;
  translate: TFunction<"translation", undefined>;
}

export const LogIn = ({ control, isValid, translate }: LogInProps) => {

  return (
    <>
      <Controller
        control={control}
        rules={{ required: true }}
        name="email"
        defaultValue={""}
        render={({ field }) => (
          <TextFieldForm
            label={translate("modals.userModal.email")}
            variant="standard"
            required
            error={!field.value?.length}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        rules={{ required: true }}
        name="password"
        defaultValue={""}
        render={({ field }) => (
          <TextFieldForm
            label={translate("modals.userModal.password")}
            variant="standard"
            required
            error={!field.value?.length}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <LogInBtnWrapper>
        <Button disabled={!isValid} type="submit">LogIn</Button>
      </LogInBtnWrapper>
    </>
  );
};
