import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import LoginIcon from '@mui/icons-material/Login';
import { LangSwither } from "./LangSwither";
import { useCallback } from "react";
import { useAppSelector } from "../../hooks";
import { authAPI } from "../../services/AuthService";
import { Navbar } from "./Navbar";
import { HeaderWrapper, LangBlock, LogOut } from "./Header.styled";

export const Header = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.auth)
  const [ logOut ] = authAPI.useFetchLogOutMutation();

  const isApp = location.pathname.includes("app");

  const hnadleChangeLanguage = useCallback((checked: boolean) => {
    i18n.changeLanguage(checked ? "en" : "ru");
  }, [i18n]);

  const handleLogOut = useCallback(() => {
    logOut({});
    navigate("/app");
  }, [navigate, logOut]);

  return (
    <HeaderWrapper isApp={isApp}>
      {!isApp && <Navbar />}
      <LangBlock onClick={handleLogOut}>
        {user && <LogOut />}
        <LangSwither changeLanguage={hnadleChangeLanguage} />
      </LangBlock>
    </HeaderWrapper>
  );
};
