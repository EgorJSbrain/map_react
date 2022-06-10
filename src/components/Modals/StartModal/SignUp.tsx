import { useCallback, useState } from "react";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { TFunction } from "react-i18next";
import styled from "styled-components";
import { UserModalForm } from "./UserModalForm";
import { PlaceType } from "../../../types/place";
import { ContentTypes, UserFormType } from "./StartModal";
import { addUser } from "../../../store/actions";
import { useAppDispatch } from "../../../hooks/redux";

const ButtonsBlock = styled(Box)`
  display: flex;
  justify-content: center;
`;

type SignUpProps = {
  translate: TFunction<"translation", undefined>;
  handleClose: () => void;
  handleSetType: (type: string) => void;
};

export const SignUp = ({
  translate,
  handleClose,
  handleSetType,
}: SignUpProps) => {
  const dispatch = useAppDispatch();
  const {
    control,
    formState: { isValid },
    handleSubmit,
    setValue,
  } = useForm<UserFormType>({
    mode: "onChange",
  });

  const [userAddress, setUserAddress] = useState<PlaceType | null>(null);

  const onSubmit = useCallback(
    async (data: UserFormType) => {
      if (userAddress) {
        const response = await dispatch(
          addUser({
            ...data,
            address: userAddress,
          })
        );

        if (response.payload) {
          handleClose();
        }
      }
    },
    [userAddress, handleClose, dispatch]
  );

  const handleSetUserAddress = (address: PlaceType) => {
    setUserAddress(address);
    setValue('address', address.display_name);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UserModalForm
        control={control}
        translate={translate}
        handleSetUserAddress={handleSetUserAddress}
      />

      <ButtonsBlock>
        <Button sx={{ mr: 4 }} onClick={() => handleSetType(ContentTypes.logIn)}>
          {translate("logIn")}
        </Button>
        <Button disabled={!isValid} type="submit">
          {translate("finishBtn")}
        </Button>
      </ButtonsBlock>
    </form>
  );
};
