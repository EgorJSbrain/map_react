import { Box } from "@mui/material";
import styled, { css } from "styled-components";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

export const Description = styled(Box)`
  margin-top: 6px;
  color: #6d6d6d;
`;

export  const IconsWrapper = styled(Box)`
  margin-top: 6px;
  display: flex;
  justify-content: flex-end;
  align-items: end;
  font-weight: 600;
  color: #6d6d6d;
`

const icon = css`
  cursor: pointer;

  :hover {
    color: #333
  }
`

export const Edit = styled.div`
  ${icon}
  margin-right: 12px;
`;

export const Delete = styled.div`
  ${icon}
  margin-right: 12px;
`;

export const AddCard = styled(AddPhotoAlternateOutlinedIcon)`
  ${icon}
`;
