import { Box, Button } from "@mui/material"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { ContentTypes } from "./StartModal"

const ButtonsWrapper = styled(Box)`
  height: 200px;
  display: flex;
  justify-content: space-around;
  padding-top: 52px;
`

const ToggleButton = styled(Button)`
  width: 182px !important;
  padding: 36px !important;
  font-size: 20px !important;
  border-radius: 44px !important;
`
type ToggleButtons = {
  handleSetType: (value: string) => void;
}

export const ToggleButtons = ({ handleSetType }: ToggleButtons) => {
  const { t } = useTranslation();

  return (
    <ButtonsWrapper>
      <ToggleButton onClick={() => handleSetType(ContentTypes.signUp)}>
        {t("signUpBtn")}
      </ToggleButton>
      <ToggleButton onClick={() => handleSetType(ContentTypes.logIn)}>
        {t("logInBtn")}
      </ToggleButton>
    </ButtonsWrapper>
  );
}
