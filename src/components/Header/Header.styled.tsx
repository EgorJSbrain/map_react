import styled from "styled-components";

export const HeaderWrapper = styled.header<{ isApp: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isApp ? `transparent` : `#0b1352`)};
  padding: 24px;
  position: ${(props) => (props.isApp ? `absolute` : `sticky`)};;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

export const LangBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 16px;
`;

export const LogOut = styled.div`
  color: #ffffff6e;

  :hover {
    cursor: pointer;
    color: #fff;
  }
`;
