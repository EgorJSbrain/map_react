import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";

export const HeaderWrapper = styled.header<{ isApp: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isApp ? `transparent` : `#0b1352`)};
  padding: 24px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

export const LangBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 12px;
  right: 16px;
`;

export const LogOut = styled(LogoutIcon)`
  color: #88f1ff;

  :hover {
    cursor: pointer;
    color: #fff;
  }
`;
