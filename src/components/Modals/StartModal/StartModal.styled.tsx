import { Box, TextField } from "@mui/material";
import styled from "styled-components";

export const CentredWrapper = styled(Box)`
  display: flex;
  justify-content: center;
`;

export const ContentWrapper = styled(Box)`
  width: 480px;
  padding: 0 24px 24px 24px;
`;

export const ButtonsBlock = styled(Box)`
  display: flex;
  justify-content: center;
`;

export const ListWrapper = styled.div`
  position: absolute;
  background-color: white;
  max-height: 132px;
  width: 408px;
  overflow-y: auto;
  z-index: 1001;
  border-radius: 4px;

  &.MuiList-root {
    padding: 0px !important;
  }
`;

export const FormWrapper = styled.div`
  padding: 24px 12px 0px 12px;
  position: relative;

  p {
    &.Mui-error {
      position: absolute;
      top: 44px;
    }
  }
`;

export const TextFieldForm = styled(TextField)`
  width: 100%;
  margin-bottom: 24px !important;

  .MuiFormLabel-asterisk {
    color: #d32f2f;
  }
`;

export const LinkBoxInfo = styled(Box)`
  color: #767676;
  margin-right: 6px;
  user-select: none;
`;

export const LinkBox = styled(Box)`
  text-decoration: underline;
  cursor: pointer;
`;
