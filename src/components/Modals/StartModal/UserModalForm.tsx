import { Autocomplete, Box, Divider, List, ListItem, ListItemText, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { TFunction } from "react-i18next";
import styled from "styled-components";
import { useDebouncedCallback } from 'use-debounce';
import { searchPlaces } from "../../../requestApi";
import { UserType } from "../../../types";
import { PlaceType } from "../../../types/place";
import { UserFormType } from "./StartModal";

const ListWrapper = styled.div`
  position: absolute;
  background-color: white;
  top: -12px;
  max-height: 132px;
  overflow-y: auto;
  z-index: 1001;
  border-radius: 4px;
`;

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
  background-color: #ececec;
`;

const TextFieldForm = styled(TextField)`
  width: 100%;
  margin-bottom: 24px !important;

  .MuiFormLabel-asterisk {
    color: #d32f2f;
  }
`;

type UserModalFormProps = {
  tabIndex: number;
  control: Control<UserFormType, any>;
  translate: TFunction<"translation", undefined>;
  handleSetUserAddress: (address: PlaceType) => void;
};

export const UserModalForm = ({
  tabIndex,
  control,
  translate,
  handleSetUserAddress,
}: UserModalFormProps) => {
  const [listPlace, setListPlace] = useState<PlaceType[]>([]);
  const [isListVisible, setListVisible] = useState(false);

  const debouncedRequest = useDebouncedCallback(async (value) => {
    const data: PlaceType[] = await searchPlaces(value);

    if (data) {
      setListPlace(data);
      setListVisible(true)
    }
  }, 500);

  const handleChange = useCallback((value: string) => {
    try {
      debouncedRequest(value);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onClick = useCallback((item: PlaceType) => {
    setListVisible(false);
    handleSetUserAddress(item)
  }, []);

  return (
    <FormWrapper>
      <BoxFields sx={{ zIndex: tabIndex === 0 ? 1 : 0 }}>
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

      <BoxFields sx={{ zIndex: tabIndex === 1 ? 1 : 0 }}>
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
                error={!field.value}
                value={field.value}
                onChange={(event) => {
                  field.onChange()
                  handleChange(event.target.value);
                }}
              />
              {isListVisible && (
                <List component="nav" aria-label="main mailbox folders">
                  <ListWrapper>
                    {listPlace.map((item) => {
                      return (
                        <div key={item?.place_id}>
                          <ListItem button onClick={() => onClick(item)}>
                            <ListItemText primary={item?.display_name} />
                          </ListItem>
                          <Divider />
                        </div>
                      );
                    })}
                  </ListWrapper>
                </List>
              )}
            </>
          )}
        />
      </BoxFields>

      <BoxFields sx={{ zIndex: tabIndex === 2 ? 1 : 0 }}>
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
        }