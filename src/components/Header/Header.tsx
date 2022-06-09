import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import LogoutIcon from "@mui/icons-material/Logout";
// import LoginIcon from '@mui/icons-material/Login';
import { LangSwither } from "./LangSwither";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { userAPI } from "../../services/UserService";

const HeaderWrapper = styled.header<{ isApp: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isApp ? `transparent` : `#59ddff`)};
  padding: 24px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const Links = styled.div`
  width: 232px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Link = styled(NavLink)`
  text-decoration: inherit;
  color: "#395964";

  :hover {
    color: white;
  }

  &.active {
    color: white;
  }
`;

const LangBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 16px;
  top: 16px;
`;

const LogOut = styled(LogoutIcon)`
  color: #88f1ff;

  :hover {
    cursor: pointer;
    color: #fff;
  }
`;

export const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.userReducer)
  const [ logOut ] = userAPI.useFetchLogOutMutation();

  const isApp = location.pathname.includes("app");

  const hnadleChangeLanguage = useCallback((checked: boolean) => {
    i18n.changeLanguage(checked ? "en" : "ru");
  }, []);

  const handleLogOut = useCallback(() => {
    // dispatch(userLogOut);
    logOut({});
    navigate("/app");
  }, []);

  return (
    <HeaderWrapper isApp={isApp}>
      {!isApp && (
        <Links>
          <Link to="/app">{t("navHome")}</Link>
          <Link to="/search">{t("navMap")}</Link>
          <Link to="/dashboard">{t("navCards")}</Link>
        </Links>
      )}
      <LangBlock onClick={handleLogOut}>
        {user && <LogOut />}
        <LangSwither changeLanguage={hnadleChangeLanguage} />
      </LangBlock>
    </HeaderWrapper>
  );
};
