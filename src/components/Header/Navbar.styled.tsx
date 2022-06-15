import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Links = styled.div`
  width: 232px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Link = styled(NavLink)`
  text-decoration: inherit;
  color: #ffffff6e;

  :hover {
    color: white;
  }

  &.active {
    color: white;
  }
`;