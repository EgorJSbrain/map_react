import { Box, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { TFunction } from "react-i18next";
import styled from "styled-components";
import { UserForm } from "../../../types";

type UserModalFormProps = {
  tabIndex: number;
  control: Control<UserForm, any>;
  translate: TFunction<"translation", undefined>;
};

const FormWrapper = styled.div`
  padding: 24px 12px 32px 12px;
  position: relative;
  height: 180px;
`;

const BoxFields = styled(Box)`
  position: absolute;
  top: 32px;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #ECECEC;
`

const TextFieldForm = styled(TextField)`
  width: 100%;
  margin-bottom: 24px !important;

  .MuiFormLabel-asterisk {
    color: #d32f2f;
  }
`;

export const UserModalForm = ({ tabIndex, control, translate }: UserModalFormProps) => {
  return (
    <FormWrapper>
      
        <BoxFields sx={{zIndex: tabIndex === 0 ? 1 : 0}}>
          <Controller
            control={control}
            rules={{ required: true }}
            name="firstName"
            defaultValue={""}
            render={({ field }) => (
              <TextFieldForm
                label={translate("modals.userModal.firstName")}
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
            name="secondName"
            defaultValue={""}
            render={({ field }) => (
              <TextFieldForm
                label={translate("modals.userModal.secondName")}
                variant="standard"
                required
                error={!field.value?.length}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </BoxFields>

        <BoxFields sx={{zIndex: tabIndex === 1 ? 1 : 0}}>
          <Controller
            control={control}
            rules={{ required: true }}
            name="country"
            defaultValue={""}
            render={({ field }) => (
              <TextFieldForm
                label={translate("modals.userModal.country")}
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
            name="city"
            defaultValue={""}
            render={({ field }) => (
              <TextFieldForm
                label={translate("modals.userModal.city")}
                variant="standard"
                required
                error={!field.value?.length}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </BoxFields>

        <BoxFields sx={{zIndex: tabIndex === 2 ? 1 : 0}}>
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
        </BoxFields>

    </FormWrapper>
  );
};
