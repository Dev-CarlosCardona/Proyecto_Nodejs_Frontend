import React, { lazy, useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Service from "../../Machine/Service";
import { Permission } from "../../Apis/Apis";

import { Box, CssBaseline, AppBar, AttachMoneyRoundedIcon, Toolbar, IconButton, Drawer, drawerWidth, AdminPanelSettingsRoundedIcon, MenuIcon, PropTypes, List, GroupsRoundedIcon, Logotipo, ExpandMoreIcon, SettingsRoundedIcon, EventAvailableRoundedIcon, ListItemIcon, BrowserUpdatedIcon } from '../../Exports-Modules/Exports';
import { Accordion, AccordionSummary, AccordionDetails, StyledListItemButton } from '../Home/Style/Style';
import './Style/Style.css';

const MenuLateral = lazy(() => import('../../Pages/Home/components/Lateral/MenuLateral'));
const BarraSuperior = lazy(() => import('../../Pages/Home/components/Superior/BarraSuperior'));
const LogOut = lazy(() => import("../../Components/LogOut/LogOut"));
const ExpSession = lazy(() => import("../../Components/ExpSessions/ExpSession"));

const Admin = lazy(() => import('../../Pages/Home/Admin/Admin'))

const InsertClient = lazy(() => import('../../Components/Company/InsertClient'));
const Employe = lazy(() => import('../../Components/Employe/Employe'));
const InicioPantalla = lazy(() => import('../../Components/InicioPantalla/InicioPantalla'))

function Home(props) {
  const { Servidor } = Service();
  const navigate = useNavigate();
  const { ventana } = props;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState('Solicitud');
  const [userRoles, setUserRoles] = useState([]);
  const [, setMessageError] = useState("");

  const [selectedComponent, setSelectedComponent] = useState('Inicio')


  //manejador el menu reducido
  const handleChange = (panel) => (e, newExpanded) => {
    setOpen(newExpanded ? panel : false);
  };
  //Vista celular
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
    navigate(`/home/${component.replace(/\s+/g, '-')}`); // cambia la URL cada vez que doy click en cualquier modulo
  };

  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const token = localStorage.getItem("_Secure-next-auth.session-token");
        const response = await Permission(
          localStorage.getItem("username"),
          token
        );
        setUserRoles(response);
      } catch (error) {
        setMessageError("No se puedo obtener los datos");
      }
    };

    fetchUserRoles();
  }, [Servidor]);

  const Lateral = (

    <MenuLateral
      open={open}
      List={List}
      Logotipo={Logotipo}
      userRoles={userRoles}
      Accordion={Accordion}
      ListItemIcon={ListItemIcon}
      handleChange={handleChange}
      ExpandMoreIcon={ExpandMoreIcon}
      AccordionDetails={AccordionDetails}
      AccordionSummary={AccordionSummary}
      GroupsRoundedIcon={GroupsRoundedIcon}
      BrowserUpdatedIcon={BrowserUpdatedIcon}
      SettingsRoundedIcon={SettingsRoundedIcon}
      StyledListItemButton={StyledListItemButton}
      handleComponentSelect={handleComponentSelect}
      AttachMoneyRoundedIcon={AttachMoneyRoundedIcon}
      EventAvailableRoundedIcon={EventAvailableRoundedIcon}
      AdminPanelSettingsRoundedIcon={AdminPanelSettingsRoundedIcon}
    />
  )

  const container = ventana !== undefined ? () => ventana().document.body : undefined;

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Solicitud':
        return <InsertClient />;
      case 'Empleado':
        return <Employe />;
      case 'Inicio':
        return <InicioPantalla />;

      //ADMINISTRADOR
      case "Permisos":
        return <Admin />;
      default:
        return <div></div>;
    }
  };

  return (
    <BarraSuperior
      Box={Box}
      AppBar={AppBar}
      Outlet={Outlet}
      LogOut={LogOut}
      Drawer={Drawer}
      Toolbar={Toolbar}
      Lateral={Lateral}
      MenuIcon={MenuIcon}
      container={container}
      IconButton={IconButton}
      ExpSession={ExpSession}
      mobileOpen={mobileOpen}
      drawerWidth={drawerWidth}
      CssBaseline={CssBaseline}
      renderComponent={renderComponent}
      handleDrawerToggle={handleDrawerToggle}
    />
  )
}

Home.propTypes = {
  ventana: PropTypes.func,
};

export default Home
