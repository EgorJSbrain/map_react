import { Autocomplete } from "@mui/material";
import { useCallback, useState } from "react";
import { Controller, useFormContext, useFormState } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { placeApi } from "../../../requestApi";
import { PlaceType } from "../../../types/place";
import { debounce } from "../../../utils";
import { FormWrapper, TextFieldForm } from "./StartModal.styled";

export const UserModalForm = () => {
  const { t } = useTranslation();
  const { control, setValue } = useFormContext();
  const [listPlace, setListPlace] = useState<PlaceType[]>([]);
  const { dirtyFields } = useFormState({ control });

  const searchRequest = useCallback(async (value: string) => {
    try {
      const data: PlaceType[] = await placeApi.search(value);

      if (data) {
        setListPlace(data);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, []);

  const debouncedChange = debounce(searchRequest, 500);

  const handleChange = (newValue: PlaceType | null) => {
    setValue("address", newValue, { shouldDirty: true });
  };

  return (
    <FormWrapper>
      <Controller
        control={control}
        rules={{ required: true }}
        name="firstName"
        defaultValue={""}
        render={({ field }) => (
          <TextFieldForm
            label={t("modals.userModal.firstName")}
            variant="standard"
            required
            error={!!dirtyFields.firstName && !field.value?.length}
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
            label={t("modals.userModal.secondName")}
            variant="standard"
            required
            error={!!dirtyFields.secondName && !field.value?.length}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        rules={{ required: true }}
        name="address"
        render={({ field }) => (
          <>
            <Autocomplete
              options={listPlace}
              isOptionEqualToValue={(option, value) => option !== value}
              getOptionLabel={(option) => option.display_name || ""}
              value={field.value || ""}
              onChange={(_, value: PlaceType | null) => {
                field.onChange();
                handleChange(value);
              }}
              renderInput={(params) => (
                <TextFieldForm
                  {...params}
                  autoComplete="off"
                  label={t("modals.userModal.country")}
                  variant="standard"
                  required
                  error={!!dirtyFields.address && !field.value}
                  onChange={(e) => {
                    debouncedChange(e.target.value);
                  }}
                />
              )}
            />
          </>
        )}
      />

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: t("validationEmailMessage"),
          },
        }}
        name="email"
        defaultValue={""}
        render={({ field, formState }) => (
          <TextFieldForm
            helperText={formState.errors.email?.message}
            label={t("modals.userModal.email")}
            variant="standard"
            required
            error={
              (!!dirtyFields.email && !field.value?.length) ||
              !!formState.errors.email
            }
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
    </FormWrapper>
  );
};
