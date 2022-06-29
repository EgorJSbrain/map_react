import { Box, Card, Input, TextField } from "@mui/material";
import styled from "styled-components";
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

export const CardItem = styled(Card)`
  width: 600px;
  padding: 24px;
  display: flex;
  position: relative;
`

export const PhotoIcon = styled(AddAPhotoOutlinedIcon)`
  width: 40px !important;
  height: 40px !important;
  color: #c1bebe;
`

export const ImgBox = styled(Box)`
  width: 120px;
  height: 120px;
  border: 2px dashed #b8c7d6;
  background-color: #e0e0e0;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 16px;

  :hover {
    ${PhotoIcon} {
      color: #a09e9e;
    }

    border-color: #a3b3c3
  }
`

export const Info = styled(Box)`
  width: 352px;
  display: flex;
  flex-direction: column;
`

export const CardStatus = styled.div`
  background-color: #2cf70040;
  height: 32px;
  width: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  color: #02980b;
  border-radius: 20px;
  position: absolute;
  top: 20px;
  right: 12px;
`;

export const CardDescription = styled(Input)`
  margin-top: 12px;

  :before {
    border: none !important
  }

  :after {
    border: none !important;
  }
`