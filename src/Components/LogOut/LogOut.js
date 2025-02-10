import React from 'react';
import { Swal, MenuItem,  ListItemIcon } from '../../Exports-Modules/Exports';
import './Styles/StylesLogOut.css';
import MenuLogOut from './MenuLogOut';

const LogOut = () => {
  const logOut = () => {
    // Limpia todas las keys necesarias del localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('_Secure-next-auth.session-token');
    localStorage.removeItem('rol'); 
    localStorage.removeItem('tokenExpire');

    // Muestra una alerta y redirige
    let timerInterval;
    Swal.fire({
      title: 'Cerrando sesión...',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector('b');
        if (b) {
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        }
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then(() => {
      window.location.href = '/';
    });
  };

  return (
    <MenuLogOut
      logOut={logOut}
      MenuItem={MenuItem}
      ListItemIcon={ListItemIcon}
    />
  );
};

export default LogOut;
