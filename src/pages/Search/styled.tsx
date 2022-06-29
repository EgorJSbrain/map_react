import styled from "styled-components";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

export const AppWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 66px);
  margin: 0 auto;
  overflow: hidden;
`;

export const AddPoint = styled.div`
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

export const AddPointIcon = styled(AddLocationAltIcon)`
  color: white;
  height: 40px !important;
  width: 40px !important;
`;
