import {
  Autocomplete,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { SyntheticEvent, useCallback, useState } from "react";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import { TFunction, useTranslation } from "react-i18next";
import { searchPlaces } from "../../../requestApi";
import { PlaceType } from "../../../types/place";
import { debounce } from "../../../utils";
import { UserFormType } from "./SignUp";
import { FormWrapper, ListWrapper, TextFieldForm } from "./styled";

type DirtyFieldsType = {
  firstName?: boolean;
  secondName?: boolean;
  address?: boolean;
  email?: boolean;
  password?: boolean;
}

type UserModalFormProps = {
  control: Control<UserFormType, any>;
  dirtyFields: DirtyFieldsType;
  setValue: UseFormSetValue<UserFormType>
};

export const UserModalForm = ({
  control,
  dirtyFields,
  setValue,
}: UserModalFormProps) => {
  const { t } = useTranslation();
  const [listPlace, setListPlace] = useState<PlaceType[]>([]);

  const searchRequest = useCallback(
    async (value: string) => {
      try {
        const data: PlaceType[] = await searchPlaces(value);

        if (data) {
          setListPlace(data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  const debouncedChange = debounce(searchRequest, 500);

  const handleChange = (newValue: PlaceType | null) => {
    // @ts-ignore
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
              onChange={(
                event: SyntheticEvent<Element, Event>,
                value: PlaceType | null
              ) => {
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
    </FormWrapper>
  );
};
