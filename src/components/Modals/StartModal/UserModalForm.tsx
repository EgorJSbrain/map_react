import {
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { useCallback, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { TFunction } from "react-i18next";
import styled from "styled-components";
import { searchPlaces } from "../../../requestApi";
import { PlaceType } from "../../../types/place";
import { debounce } from "../../../utils/debounce";
import { UserFormType } from "./SignUp";

type DirtyFieldsType = {
  firstName?: boolean;
  secondName?: boolean;
  address?: boolean;
  email?: boolean;
  password?: boolean;
}

const ListWrapper = styled.div`
  position: absolute;
  background-color: white;
  max-height: 132px;
  width: 408px;
  overflow-y: auto;
  z-index: 1001;
  border-radius: 4px;

  &.MuiList-root {
    padding: 0px !important
  }
`;

const FormWrapper = styled.div`
  padding: 24px 12px 32px 12px;
  position: relative;
`;

const TextFieldForm = styled(TextField)`
  width: 100%;
  margin-bottom: 24px !important;

  .MuiFormLabel-asterisk {
    color: #d32f2f;
  }
`;

type UserModalFormProps = {
  control: Control<UserFormType, any>;
  dirtyFields: DirtyFieldsType;
  translate: TFunction<"translation", undefined>;
  handleSetUserAddress: (address: PlaceType | null) => void;
};

export const UserModalForm = ({
  control,
  dirtyFields,
  translate,
  handleSetUserAddress,
}: UserModalFormProps) => {
  const [listPlace, setListPlace] = useState<PlaceType[]>([]);
  const [isListVisible, setListVisible] = useState(false);

  const searchRequest = useCallback(
    async (value: string) => {
      try {
        if (!value.length) {
          handleSetUserAddress(null);
          return;
        }
        const data: PlaceType[] = await searchPlaces(value);

        if (data) {
          setListPlace(data);
          setListVisible(true);
        }
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  const debouncedChange = debounce(searchRequest, 500);

  const onClick = useCallback((item: PlaceType) => {
    setListVisible(false);
    handleSetUserAddress(item);
  }, [handleSetUserAddress, setListVisible]);

  return (
    <FormWrapper>
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
            label={translate("modals.userModal.secondName")}
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
            <TextFieldForm
              autoComplete="off"
              label={translate("modals.userModal.country")}
              variant="standard"
              required
              error={!!dirtyFields.address && !field.value}
              value={field.value}
              onChange={(e) => {
                field.onChange();
                debouncedChange(e.target.value);
              }}
            />
            {isListVisible && !!listPlace.length && (
              <ListWrapper>
                <List>
                  {listPlace.map((item, index) => (
                    <div key={index}>
                      <ListItem
                        button
                        onClick={() => onClick(item)}
                      >
                        <ListItemText primary={item?.display_name} />
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </List>
              </ListWrapper>
            )}
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
            label={translate("modals.userModal.email")}
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
            label={translate("modals.userModal.password")}
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