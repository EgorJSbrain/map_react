import styled from "styled-components";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

export const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 66px;
`;

export const AddPlace = styled.div`
  width: 80px;
  height: 80px;
  position: absolute;
  background-color: #0b1352;
  z-index: 1000;
  border-radius: 50%;
  bottom: 32px;
  right: 32px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AddPlaceIcon = styled(AddLocationAltIcon)`
  color: white;
  height: 40px !important;
  width: 40px !important;
`;
