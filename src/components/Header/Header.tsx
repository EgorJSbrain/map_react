import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LangSwither } from "./LangSwither";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Navbar } from "./Navbar";
import { HeaderWrapper, LangBlock, LogOut } from "./Header.styled";
import { userLogOut } from "../../store/actions";

export const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const isApp = location.pathname.includes("app");

  const hnadleChangeLanguage = useCallback((checked: boolean) => {
    i18n.changeLanguage(checked ? "en" : "ru");
  }, [i18n]);

  const handleLogOut = useCallback(() => {
    dispatch(userLogOut());
    navigate("/app");
  }, [navigate]);

  return (
    <HeaderWrapper isApp={isApp}>
      {!isApp && <Navbar />}
      <LangBlock>
        {user && <LogOut onClick={handleLogOut}>{t("logOut")}</LogOut>}
        <LangSwither changeLanguage={hnadleChangeLanguage} />
      </LangBlock>
    </HeaderWrapper>
  );
};
