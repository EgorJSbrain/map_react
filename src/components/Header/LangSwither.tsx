import { Switch } from '@mui/material';
import styled from 'styled-components';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MaterialUISwitch = styled(Switch)(theme => ({
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
        backgroundImage: 'url(./uk.svg)',
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        marginLeft: 4,
        backgroundImage: 'url(./ru.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#ffe108',
    width: 32,
    height: 32,
    '&:before': {
      content: '\'\'',
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: 'url(./ru.svg)',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundImage: 'url(./uk.svg)',
    backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right',
    borderRadius: 20 / 2,
  },
}));

type LangSwitherProps = {
  changeLanguage: (value: boolean) => void;
}

export const LangSwither = ({ changeLanguage }: LangSwitherProps) => (
  <MaterialUISwitch
    sx={{ m: 1 }}
    defaultChecked
    onChange={(e, checked) => changeLanguage(checked)}
  />
);
