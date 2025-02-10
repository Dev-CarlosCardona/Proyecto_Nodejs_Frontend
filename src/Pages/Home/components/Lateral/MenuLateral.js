import React, { useState } from 'react';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';

const MenuLateral = ({
    open,
    List,
    Logotipo,
    Accordion,
    userRoles,
    handleChange,
    ListItemIcon,
    ExpandMoreIcon,
    AccordionSummary,
    AccordionDetails,
    GroupsRoundedIcon,
    SettingsRoundedIcon,
    StyledListItemButton,
    handleComponentSelect,
    EventAvailableRoundedIcon,
    AdminPanelSettingsRoundedIcon
}) => {

    const [selectedIcon, setSelectedIcon] = useState(null);

    const handleIconClick = (iconName) => {
        setSelectedIcon(iconName);
        handleComponentSelect(iconName);
    }
    return (
        <>
            <div className=''>
                <div className='Solicitud'>
                    <img className='logo-k' src={Logotipo} alt='' />
                </div>

                <List>
                    <Accordion expanded={open === 'Solicitud'} onChange={handleChange('Solicitud')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <div className='AccordionSummary-style'>
                                <SettingsRoundedIcon fontSize='small' />
                            </div>
                            <div className='title-modulos'>COMPANY K</div>
                        </AccordionSummary>

                        <AccordionDetails>
                            {userRoles.some(role => role.Id_Modulo === "1.0") && (
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <div className='NewspaperRoundedIcon-style'>
                                            <EventAvailableRoundedIcon fontSize='small' className={
                                                selectedIcon === 'Solicitud' || selectedIcon === 'Ventas'
                                                    ? 'selectModule' : ''} />
                                        </div>
                                        <div className='title-modulos'>PERSONAL COMPAÑIA</div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            {userRoles.some(role => role.Id_Modulo === "1.1") && (
                                                <StyledListItemButton onClick={() => handleIconClick('Solicitud')} selected={selectedIcon === 'Solicitud'}>
                                                    <ListItemIcon>
                                                        <EngineeringRoundedIcon fontSize='small' className={selectedIcon === 'Solicitud' ? 'selectModule' : ''} />
                                                    </ListItemIcon>
                                                    <div className='title-modulos'>Solicitud</div>
                                                </StyledListItemButton>
                                            )}
                                            {userRoles.some(role => role.Id_Modulo === "1.2") && (
                                                <StyledListItemButton onClick={() => handleIconClick('Empleado')} selected={selectedIcon === 'Empleado'}>
                                                    <ListItemIcon>
                                                        <GroupsRoundedIcon fontSize='small' className={selectedIcon === 'Empleado' ? 'selectModule' : ''} />
                                                    </ListItemIcon>
                                                    <div className='title-modulos'>Empleado</div>
                                                </StyledListItemButton>
                                            )}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            )}
                        </AccordionDetails>
                    </Accordion>

                    {userRoles.some(role => role.Id_Modulo === "0.0") && (
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon fontSize='small' />}>
                                <div className='NewspaperRoundedIcon-style'>
                                    <AdminPanelSettingsRoundedIcon fontSize='small' className={selectedIcon === 'Permisos' ? 'selectModule' : ''} />
                                </div>
                                <div className='title-modulos'>ADMINISTRADOR</div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    {userRoles.some(role => role.Id_Modulo === "0.1") && (
                                        <StyledListItemButton onClick={() => handleIconClick('Permisos')} selected={selectedIcon === 'Permisos'}>
                                            <ListItemIcon>
                                                <VpnKeyRoundedIcon fontSize='small' className={selectedIcon === 'Permisos' ? 'selectModule' : ''} />
                                            </ListItemIcon>
                                            <div className='title-modulos'>Permisos</div>
                                        </StyledListItemButton>
                                    )}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    )}
                </List>
            </div>
        </>
    );
}

export default MenuLateral;
