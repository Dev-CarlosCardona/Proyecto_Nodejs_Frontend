
import React from 'react';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

const MenuLogOut = ({ logOut, MenuItem, ListItemIcon }) => {
    return (
        <MenuItem
            onClick={logOut}
            className='menu-logout-text'
            style={{
                fontWeight: 'bold',
                fontFamily: 'Nunito, sans-serif',
                color: '#d32f2f',
                backgroundColor: '#ffe6e6'
            }}
        >
            <ListItemIcon style={{ color: '#d32f2f' }}>
                <HighlightOffRoundedIcon fontSize='small' />
            </ListItemIcon>
            Cerrar sesión
        </MenuItem>
    );
};

export default MenuLogOut;
