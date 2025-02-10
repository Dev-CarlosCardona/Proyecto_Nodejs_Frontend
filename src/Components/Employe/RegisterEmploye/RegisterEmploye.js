import React, { useState } from 'react';

const ModalResgister = ({ Modal, Styles, Button, openModal, onSubmitRegister, handleCloseModal }) => {
    // Define el estado inicial con las propiedades que se enviarán al endpoint
    const initialFormData = {
        FECHA_INGRESO: '',
        NOMBRE: '',
        SALARIO: '',
        Estado_Empleado: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    // Función para formatear el salario
    const formatNumber = (value) => {
        if (!value) return '';
        // Inserta un punto como separador de miles:
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    // Maneja los cambios en los inputs 
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Maneja el cambio específico para el campo SALARIO
    const handleSalaryChange = (e) => {
        // Obtiene el valor ingresado y elimina todo lo que no sean dígitos
        let rawValue = e.target.value.replace(/\D/g, '');
        setFormData({
            ...formData,
            SALARIO: rawValue
        });
    };

    const validadorFormulario = (formData) => {
        if (
            formData.FECHA_INGRESO !== '' &&
            formData.NOMBRE !== '' &&
            formData.SALARIO !== '' &&
            formData.Estado_Empleado !== ''
        ) {
            return false;
        } else {
            return true;
        }
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitRegister(formData);
        setFormData(initialFormData);
    };

    return (
        <Modal
            title='Nuevo registro'
            width={800}
            footer={null}
            open={openModal}
            onCancel={() => {
                setFormData(initialFormData);
                handleCloseModal();
            }}
        >
            <hr />
            <form onSubmit={handleSubmit}>
                <div className='d-flex flex-column mb-3'>

                    <div className='d-flex'>
                        <div className='p-2 col-md-6'>
                            <label htmlFor='FECHA_INGRESO' className='form-label text-muted'>Fecha Ingreso</label>
                            <input
                                className='form-control'
                                type='date'
                                style={Styles.Titles}
                                id='FECHA_INGRESO'
                                name='FECHA_INGRESO'
                                value={formData.FECHA_INGRESO}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='p-2 col-md-6'>
                            <label htmlFor='NOMBRE' className='form-label text-muted'>Nombre Completo</label>
                            <input
                                className='form-control'
                                type='text'
                                style={Styles.Titles}
                                id='NOMBRE'
                                name='NOMBRE'
                                value={formData.NOMBRE}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className='d-flex'>
                        <div className='p-2 col-md-6'>
                            <label htmlFor='SALARIO' className='form-label text-muted'>Salario</label>
                            <input
                                className='form-control'
                                type='text'
                                style={Styles.Titles}
                                id='SALARIO'
                                name='SALARIO'
                                value={formatNumber(formData.SALARIO)}
                                onChange={handleSalaryChange}
                            />
                        </div>

                        <div className='p-2 col-md-6'>
                            <label htmlFor='Estado_Empleado' className='form-label text-muted'>Estado del Empleado</label>
                            <select
                                className='form-select'
                                style={Styles.Titles}
                                id='Estado_Empleado'
                                name='Estado_Empleado'
                                value={formData.Estado_Empleado}
                                onChange={handleChange}
                            >
                                <option value=''>Seleccione el estado</option>
                                <option value='Activo'>Activo</option>
                                <option value='Retiro'>Retiro</option>
                            </select>
                        </div>
                    </div>

                    <div className='d-flex flex-row-reverse'>
                        <div className='p-2'>
                            <Button variant='soft' size='sm' color='danger' onClick={() => { setFormData(initialFormData); handleCloseModal(); }}>
                                Cancelar
                            </Button>
                        </div>
                        <div className='p-2'>
                            <Button variant='soft' size='sm' color='success' type='submit' disabled={validadorFormulario(formData)} >
                                Crear Empleado
                            </Button>
                        </div>
                    </div>

                </div>
            </form>
        </Modal>
    );
};

export default ModalResgister;
