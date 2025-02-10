import Service from "../Machine/Service";
import apiClient from "../Service/Service";

const { Servidor } = Service();

const Apis = {

    Permission: (username) => `http://${Servidor}/API/GET-USER-PERMISSIONS/${username}`,
    getPermissionsByCargo: `http://${Servidor}/API/UPDATE-USER-PERMISSIONS/`,
    getListCargoPermissions: `http://${Servidor}/API/GET-LIST-CARGO/PERMISSIONS/`,


    // ENDPOINT PARA VISUALIZAR TODOS LOS EMPLEADOS QUE SE ENCUENTRA EN LA TABLA
    AllEmpleados: `http://${Servidor}/API/GET/ALL-COMPANY/`,
    // ENDPOINT PARA INSERTAR EMPLEADOS NUEVOS
    RegisterPerson: `http://${Servidor}/API/POST/INSERT-PERSON/`,
    // ENDPOINT PARA ACTULIZAR LOS DATOS DE LOS EMPLEADOS
    UpdatePerson: (id) => `http://${Servidor}/API/PUT/UPDATE-PERSON/${id}`,
    // ENDPOINT PARA ELIMINAR LOS EMPLEADOS
    DeletePerson: (id) => `http://${Servidor}/API/DELETE/PERSON-DELETE/${id}`,

    // ENDPOINT PARA EL TAMAÑO DE LOS EMPLEADOS ACTIVOS
    ActivoEmpleado: `http://${Servidor}/API/GET/ACTIVO-EMPLEADO/`,
    // ENDPOINT PARA EL TAMAÑO DE LOS EMPLEADOS RETIROS
    RetiroEmpleado: `http://${Servidor}/API/GET/RETIRO-EMPLEADO/`,
    // ENDPOINT PARA EL TAMAÑO DE TODOS LOS EMPLEADOS
    TodoEmpleado: `http://${Servidor}/API/GET/TODO-EMPLEADO/`
};


const handleApiResponse = async (res) => {
    if (res.status === 404) {
        return {};
    } else {
        return await res.data;
    }
};

/*OBTIENE LA LISTA DE PERMISOS*/
export const Permission = async (username, token) => {
    const res = await apiClient.get(Apis.Permission(username), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return handleApiResponse(res);
};

export const getPermissionsByCargo = async () => {
    const res = await apiClient.get(Apis.getPermissionsByCargo);
    return handleApiResponse(res);
};

export const cargoUsersPermissions = async () => {
    const res = await apiClient.get(Apis.getListCargoPermissions);
    return handleApiResponse(res);
};

export const AllEmpleados = async () => {
    const res = await apiClient.get(Apis.AllEmpleados);
    return handleApiResponse(res);
};

export const RegisterPerson = async (data) => {
    const res = await apiClient.post(Apis.RegisterPerson, data);
    return handleApiResponse(res);
};


export const UpdatePerson = async (id, data) => {
    const res = await apiClient.put(Apis.UpdatePerson(id), data);
    return handleApiResponse(res);
};

export const DeletePerson = async (id) => {
    const res = await apiClient.delete(Apis.DeletePerson(id));
    return handleApiResponse(res);
};

export const ActivoEmpleado = async () => {
    const res = await apiClient.get(Apis.ActivoEmpleado);
    return handleApiResponse(res);
};

export const RetiroEmpleado = async () => {
    const res = await apiClient.get(Apis.RetiroEmpleado);
    return handleApiResponse(res);
};

export const TodoEmpleado = async () => {
    const res = await apiClient.get(Apis.TodoEmpleado);
    return handleApiResponse(res);
};