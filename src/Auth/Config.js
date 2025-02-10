
import Service from '../Machine/Service';

const Config = () => {
    const { Servidor } = Service();

    const loginURL = `http://${Servidor}/API/AUTH/LOGIN`;
    const registerURL = `http://${Servidor}/API/AUTH/REGISTER`;
    const fecthFullInformation = `http://${Servidor}/Full-information/${localStorage.getItem('username')}`;
    // END-POINT PARA INSERTAR O ELIMINAR PERMISOS
    const InsertAndDeletePermissions = `http://${Servidor}/API/INSERT-PERMISSIONS/PUT/`;


    return {
        loginURL,
        registerURL,
        fecthFullInformation,
        InsertAndDeletePermissions
    };
};

export default Config;
