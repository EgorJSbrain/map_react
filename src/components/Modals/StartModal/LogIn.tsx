import { Button } from "@mui/material";
import { useCallback, useEffect } from "react";
import { Controller, useForm, useFormState } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { userAuth } from "../../../store/actions";
import { ContentTypes } from "./StartModal";
import {
  CentredWrapper,
  LinkBox,
  LinkBoxInfo,
  TextFieldForm,
} from "./StartModal.styled";

type UserFormType = {
  password: string;
  email: string;
};

type LogInProps = {
  handleSetType: (type: string) => void;
};

export const LogIn = ({ handleSetType }: LogInProps) => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<UserFormType>({
    mode: "onChange",
  });
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { t } = useTranslation();
  const { dirtyFields } = useFormState({ control });

  useEffect(() => {
    user && navigation("/search");
  }, [user, navigation]);

  const onSubmit = useCallback(
    (data: UserFormType) => {
      try {
        dispatch(
          userAuth({
            password: data.password,
            email: data.email,
          })
        );
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    },
    [dispatch]
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
            label={t("modals.userModal.email")}
            variant="standard"
            required
            error={!!dirtyFields.email && !field.value?.length}
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
            label={t("modals.userModal.password")}
            variant="standard"
            required
            error={!!dirtyFields.password && !field.value?.length}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <CentredWrapper>
        <Button sx={{ mb: 2 }} disabled={!isValid} type="submit">
          {t("logInBtn")}
        </Button>
      </CentredWrapper>

      <CentredWrapper>
        <LinkBoxInfo>{t("notExistedAccaunt")}</LinkBoxInfo>
        <LinkBox onClick={() => handleSetType(ContentTypes.signUp)}>
          {t("signUpBtn")}
        </LinkBox>
      </CentredWrapper>
    </form>
  );
};
