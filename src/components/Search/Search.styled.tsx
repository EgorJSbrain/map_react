import { TextField } from "@mui/material";
import styled from "styled-components";

export const Input = styled(TextField)`
  width: 100%;

  @media (max-width: 720px) {
    .MuiInput-input {
      padding: 4px 12px 5px;
    }
  }
`

export const SearchWrapper = styled.div`
  position: relative;
  margin: 40px auto;
  max-width: 1000px;

  @media (min-width: 720px) {
    padding: 0 24px;
  }
`;
