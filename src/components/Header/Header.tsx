import { NavLink } from "react-router-dom"
import styled from "styled-components"

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #59ddff;
  padding: 24px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`

const Links = styled.div`
  width: 232px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Link = styled(NavLink)`
  text-decoration: inherit;
  color: #395964;

  :hover {
    color: white;
  }

  &.active {
    color: white;
  }
`

export const Header = () => {
  return (
    <HeaderWrapper>
      <Links>
        <Link to="/">HOME</Link>
        <Link to="/search">MAP</Link>
        <Link to="/dashboard">CARDS</Link>
      </Links>
    </HeaderWrapper>
  );
}