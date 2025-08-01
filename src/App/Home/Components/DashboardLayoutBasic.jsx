import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import logoBow from '../../../assets/NLBOW.png';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import UserInfo from './UserInfo';
import SavingsIcon from '@mui/icons-material/Savings';
import { useNavigate, useLocation } from 'react-router-dom'; // Importar useLocation
import { AccountBalanceWallet, AddCard, ChecklistRtl, CreditCard, ExitToApp, History, LocalMall, Money, ShoppingBasket } from '@mui/icons-material';
import { Avatar, Button, Card } from '@mui/material';
import LogOutComponent from './LogOutComponent';
import { useDispatch, useSelector } from 'react-redux';
import { logOutApp } from '../../../Store/Authetication/Thunks';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const NAVIGATION = [
  {
    segment: 'home',
    title: 'INICIO',
    icon: <DashboardIcon />,
  },
  {
    kind: 'header',
    title: 'Prospectos',
  },
  {
    segment: 'prospectos/altaCliente',
    title: 'Alta Cliente',
    icon: <AssuredWorkloadIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Clientes',
  },
  {
    segment: 'clientes/solicitar',
    title: 'Nueva Solicitud',
    icon: <ChecklistRtl />,
    children: [
      {
        segment: 'cuenta-clientes',
        title: 'Cuenta',
        icon: <SavingsIcon />,
      },
      {
        segment: 'tdc',
        title: 'Tarjeta de Credito',
        icon: <CreditCard />,
      },
      {
        segment: 'crp',
        title: 'Credito Personal',
        icon: <Money />,
      },
      {
        segment: 'crm',
        title: 'Credito Moto',
        icon: <TwoWheelerIcon />,
      },
    ],
  },
  {
    segment: 'finalizar',
    title: 'Finalizar tramites',
    icon: <AssignmentTurnedInIcon />,
    children: [
      {
        segment: 'tdc',
        title: 'Tarjeta de Credito',
        icon: <AddCard />,
      },
      {
        segment: 'crm',
        title: 'Credito Moto',
        icon: <TwoWheelerIcon />,
      },
    ]
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Ejecutivos',
  },
  {
    segment: 'ejecutivo/cartera',
    title: 'Cartera de Clientes',
    icon: <AccountBalanceWallet />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent() {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
    </Box>
  );
}

function DashboardLayoutBasic({ window, children }) {
  const [pathname, setPathname] = React.useState('/Home');
  const dispatch = useDispatch();
  const { titleName, profile } = useSelector(state => state.sistema);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    setPathname(location.pathname);
  }, [location]);


  const [session, setSession] = React.useState({
    user: {
      name: titleName,
      email: profile,
    },
  });

  React.useEffect(() => {
    if (titleName && profile) {
      setSession({
        user: {
          name: titleName,
          email: profile,
        },
      });
    }
  }, [titleName, profile]);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => navigate(path),
    };
  }, [pathname, navigate]);

  const demoWindow = window !== undefined ? window() : undefined;

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: titleName,
            email: profile,
          },
        });
      },
      signOut: () => {
        dispatch(logOutApp());
        setSession(null);
      },
    };
  }, [dispatch, profile, titleName]);

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src={logoBow} alt="Logo" />,
        title: '',
      }}
    >
      <DashboardLayout>
        {children ? children : <DemoPageContent pathname={pathname} />}
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
  children: PropTypes.node,
};

export default DashboardLayoutBasic;