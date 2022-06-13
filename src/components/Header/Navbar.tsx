import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Links = styled.div`
  width: 232px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Link = styled(NavLink)`
  text-decoration: inherit;
  color: #ffffff6e;

  :hover {
    color: white;
  }

  &.active {
    color: white;
  }
`;

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <Links>
      <Link to="/app" data-testid={'home-link'}>{t("navHome")}</Link>
      <Link to="/search" data-testid={'search-link'}>{t("navMap")}</Link>
      <Link to="/dashboard" data-testid={'cards-link'}>{t("navCards")}</Link>
    </Links>
  );
};
