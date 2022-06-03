import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url(./uk.svg)`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#ffe108',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#ffe108',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url(./ru.svg)`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: 'red',
    borderRadius: 20 / 2,
  },
}));

const HeaderWrapper = styled.header<{isApp: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.isApp ? `transparent` : `#59ddff`)};;
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

const Link = styled(NavLink)<{isApp: boolean}>`
  text-decoration: inherit;
  color: ${props => props.isApp ? '#88f1ff' : '#395964'};

  :hover {
    color: white;
  }

  &.active {
    color: white;
  }
`

const LangBlock = styled.div`
  position: absolute;
  right: 0;
`

export const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isApp = location.pathname.includes('app')

  const changeLanguage = (checked: boolean) => {
    i18n.changeLanguage(checked ? 'en' : 'ru');
  };

  return (
    <HeaderWrapper isApp={isApp}>
      <Links>
        <Link to="/app" isApp={isApp}>{t('navHome')}</Link>
        <Link to="/search" isApp={isApp}>{t('navMap')}</Link>
        <Link to="/dashboard" isApp={isApp}>{t('navCards')}</Link>
      </Links>
      <LangBlock>
        <MaterialUISwitch
          sx={{ m: 1 }}
          defaultChecked
          onChange={(e, checked) => changeLanguage(checked)}
        />
      </LangBlock>
    </HeaderWrapper>
  );
}