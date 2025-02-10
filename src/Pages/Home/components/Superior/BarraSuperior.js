
import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';

const BarraSuperior = ({
    Box,
    AppBar,
    Drawer,
    Toolbar,
    IconButton,
    CssBaseline,
    Lateral,
    mobileOpen,
    handleDrawerToggle,
    renderComponent,
    Outlet,
    drawerWidth,
    MenuIcon,
    container,
    LogOut,
    ExpSession
}) => {
    return (
        <>
            <Box sx={{ display: 'flex', height: '100vh' }}>
                <CssBaseline />
                <AppBar
                    className='appBar'
                    position='fixed'
                    sx={{
                        background: '#ffffff',
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` }
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color='inherit'
                            aria-label='open drawer'
                            edge='start'
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' }, color: '#6587F4' }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div className='p-2'>
                            <ExpSession />
                            <Breadcrumbs aria-label='breadcrumb'>
                                <Link
                                    underline='hover'
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                    color='inherit'
                                    href='/home'
                                >
                                    <HomeIcon sx={{ mr: 0.5 }} fontSize='small' />
                                    Inicio
                                </Link>
                            </Breadcrumbs>
                        </div>
                        <Box sx={{ flexGrow: 1 }} />
                        {/* Aquí se coloca el botón de Logout en la barra superior */}
                        <div className='d-flex justify-content-end'
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                            <LogOut />
                        </div>
                    </Toolbar>
                </AppBar>
                <Box
                    component='nav'
                    className='drawer-Bar'
                    sx={{ width: { sm: drawerWidth, }, flexShrink: { sm: 0 } }}
                    aria-label='mailbox folders'
                >
                    <Drawer
                        container={container}
                        variant='temporary'
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {Lateral}
                    </Drawer>
                    <Drawer
                        variant='permanent'
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: '0px solid #e9e9ee', boxShadow: '3px 1px 2px #e9e9ee' },
                        }}
                        open
                    >
                        {Lateral}
                    </Drawer>
                </Box>
                <Box
                    component='main'
                    className='scroll-container-home'
                    sx={{
                        flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` },
                        backgroundColor: '#ddd',
                        height: '100vh'
                    }}
                >
                    <Toolbar />
                    <Outlet />
                    {renderComponent()}
                </Box>
            </Box>
        </>
    );
};

export default BarraSuperior;
