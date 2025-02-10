import { useState, useEffect } from 'react';

import { ActivoEmpleado, RetiroEmpleado, TodoEmpleado } from '../../../Apis/Apis';

export const EmpleadoActivo = () => {
    const [empleadosActivos, setEmpleadosActivos] = useState([]);

    useEffect(() => {
        const getEmpleadosActivos = async () => {
            try {
                const response = await ActivoEmpleado();
                setEmpleadosActivos(response);
            } catch (error) {
                console.log('Sin resultados');
            }

            setTimeout(getEmpleadosActivos, 10000);
        };
        getEmpleadosActivos();
    }, []);

    return empleadosActivos;
};


export const EmpleadoRetiro = () => {
    const [empleadosRetiro, setEmpleadosRetiro] = useState([]);
    useEffect(() => {
        const getEmpleadosRetiro = async () => {
            try {
                const response = await RetiroEmpleado();
                setEmpleadosRetiro(response);
            } catch (error) {
                console.log('Sin resultados');
            }

            setTimeout(getEmpleadosRetiro, 10000);
        };
        getEmpleadosRetiro();
    }, []);

    return empleadosRetiro;
}

export const EmpleadoTodo = () => {
    const [todoEmpleados, setTodoEmpleado] = useState([]);
    useEffect(() => {
        const getEmpleadosTodos = async () => {
            try {
                const response = await TodoEmpleado();
                setTodoEmpleado(response);
            } catch (error) {
                console.log('Sin resultados');
            }

            setTimeout(getEmpleadosTodos, 10000);
        };
        getEmpleadosTodos();
    }, []);

    return todoEmpleados;

}