import { Button, TextField } from "@mui/material";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TFunction } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authAPI } from "../../../services/AuthService";
import { ContentTypes } from "./StartModal";

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
`;

type UserFormType = {
  password: string;
  email: string;
}

type LogInProps = {
  translate: TFunction<"translation", undefined>;
  handleSetType: (type: string) => void;
};

export const LogIn = ({ translate, handleSetType }: LogInProps) => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<UserFormType>({
    mode: "onChange",
  });
  const navigation = useNavigate();
  const [logIn, { data }] = authAPI.useFetchLogInMutation();

  useEffect(() => {
    data && navigation('/search')
  }, [data, navigation]);

  const onSubmit = useCallback(
    (data: UserFormType) => {
      try {
        logIn({
          password: data.password,
          email: data.email,
        });
      } catch (e) {
        console.log(e);
      }
    },
    [logIn]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button sx={{ mr: 4 }} onClick={() => handleSetType(ContentTypes.signUp)}>
          {translate("signUp")}
        </Button>

        <Button disabled={!isValid} type="submit">
          {translate("logIn")}
        </Button>
      </LogInBtnWrapper>
    </form>
  );
};
