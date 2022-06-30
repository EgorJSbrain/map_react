import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";

export const Close = styled(CloseIcon)`
  position: absolute;
  top: 24px;
  right: 24px;

  :hover {
    cursor: pointer;
  }
`;

export const ContentWrapper = styled(Box)`
  width: 480px;
  padding: 0 24px 24px 24px;
`;
