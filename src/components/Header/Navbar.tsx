import { useTranslation } from "react-i18next";
import { Links, Link } from "./Navbar.styled";

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
