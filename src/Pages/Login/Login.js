import React, { useState, useContext } from 'react';
import './Styles/stylesLogin.css';
import Config from '../../Auth/Config';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { Swal, Button, Logotipo } from '../../Exports-Modules/Exports';

import RegisterModal from './RegisterModal';
import apiClient from '../../Service/Service';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const { loginURL } = Config();
    const [userID, setInput] = useState({ username: '', password: '' });
    const [loading, setIsLoading] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);

    const handleOpenModalRegister = () => {
        setOpenRegister(true);
    };

    const handleCloseModalRegister = () => {
        setOpenRegister(false);
    };

    const inputChange = ({ target }) => {
        const { name, value } = target;
        setInput({
            ...userID,
            [name]: name === 'username' ? value.toLowerCase() : value,
        });
    };

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await apiClient.post(loginURL, userID);
            const data = response.data;

            login(data.username);

            setIsLoading(false);
            localStorage.setItem('_Secure-next-auth.session-token', data.token);
            localStorage.setItem('tokenExpire', data.tokenExpire);
            localStorage.setItem('rol', data.rol);
            
            navigate('/home');
        } catch (error) {
            setIsLoading(false);
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message || 'Error en la solicitud. Por favor, inténtalo de nuevo.',
            });
        }
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
    };

    return (
        <div className='container-login-form'>
            <div className='container-login'>
                <form name='form1' className='box' method='POST'>
                    <h4>
                        <img className='img' src={Logotipo} alt='Logo' />
                    </h4>
                    <h5>COMPANY UNIVERSAL</h5>
                    <input
                        id='username'
                        type='string'
                        maxLength={20}
                        name='username'
                        onChange={inputChange}
                        value={userID.username}
                        placeholder='Usuario de red'
                    />

                    <input
                        id='password'
                        type='password'
                        placeholder='Contraseña'
                        name='password'
                        value={userID.password}
                        onChange={inputChange}
                        onKeyPress={handleEnter}
                        autoComplete='new-password'
                    />

                    <Button
                        disabled={loading}
                        variant='contained'
                        sx={{
                            width: '340px',
                            height: '49px',
                            color: '#dfdeee',
                            fontSize: '16px',
                            transition: '0.3s',
                            cursor: 'pointer',
                            background: '#7f5feb',
                            borderRadius: '100px',
                        }}
                        onClick={onSubmit}
                    >
                        {loading ? 'Cargando...' : 'Ingresar'}
                    </Button>

                    <Button
                        variant="outlined"
                        sx={{
                            width: '340px',
                            height: '49px',
                            marginTop: '10px',
                            color: '#004980',
                            fontSize: '16px',
                            borderRadius: '100px',
                        }}
                        onClick={handleOpenModalRegister}
                    >
                        Registrar
                    </Button>
                </form>
            </div>

            {/* MODAL PARA REGISTRO */}
            <RegisterModal
                open={openRegister}
                handleCloseModalRegister={handleCloseModalRegister}
            />
        </div>
    );
};

export default Login;
