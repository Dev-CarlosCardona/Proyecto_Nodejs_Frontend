import React from 'react';

const DetailsEmploye = ({ Modal, Styles, Button, selectedProduct, openDetailsProduct, handleCloseDetailProduct }) => {
    if (!selectedProduct) {
        return (
            <Modal
                title='Detalles registro'
                width={400}
                footer={null}
                open={openDetailsProduct}
                onCancel={handleCloseDetailProduct}
            >
                <p>Cargando detalles...</p>
            </Modal>
        );
    }

    return (
        <Modal
            title='Detalles registro'
            width={600}
            footer={null}
            open={openDetailsProduct}
            onCancel={handleCloseDetailProduct}
        >
            <hr />
            <div className='row align-items-center'>
                <div className='col mb-3'>
                    <label style={Styles.Titles} htmlFor='Fecha_Ingreso' className='form-label d-flex'>
                        Fecha Ingreso
                    </label>
                    <div className='text-muted'>
                        <div className='details-value'>{selectedProduct.FECHA_INGRESO}</div>
                    </div>
                </div>
                <div className='col mb-3'>
                    <label style={Styles.Titles} htmlFor='NOMBRE' className='form-label d-flex'>
                        Nombre Completo
                    </label>
                    <div className='text-muted'>
                        <div className='title-metas'>{selectedProduct.NOMBRE}</div>
                    </div>
                </div>
            </div>
            <div className='row align-items-center'>
                <div className='col mb-3'>
                    <label style={Styles.Titles} htmlFor='SALARIO' className='form-label d-flex'>
                        Salario del Empleado
                    </label>
                    <div className='text-muted'>
                        <div className='title-metas'>{selectedProduct.SALARIO}</div>
                    </div>
                </div>
                <div className='col mb-3'>
                    <label style={Styles.Titles} htmlFor='Estado_Empleado' className='form-label d-flex'>
                        Estado de Empleado
                    </label>
                    <div className='text-muted'>
                        <div className='title-metas'>{selectedProduct.Estado_Empleado}</div>
                    </div>
                </div>
                <div className='d-flex flex-row-reverse'>
                    <div className='p-2'>
                        <Button variant='soft' size='sm' color='danger' onClick={handleCloseDetailProduct}>
                            Cerrar
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default DetailsEmploye;
