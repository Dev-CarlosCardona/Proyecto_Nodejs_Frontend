import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import { AuthContext } from '../Context/AuthContext';
import { UserProfileProvider } from '../Context/ProfileContex';

const PrivateRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    // Redirige al login si no está autenticado
    return <Navigate to="/" replace />;
  }

  return (
    <UserProfileProvider>
      <Home />
    </UserProfileProvider>
  );
};

export default PrivateRoutes;