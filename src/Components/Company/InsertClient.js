
import React, { useCallback, useEffect, useState } from 'react';
import './Styles/Style.css';
import { CustomNoRowsOverlay, ItemContent, StyledDataGrid, PAGE_SIZE, CustomPagination, } from './Styles/Styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, AddRoundedIcon, SearchRoundedIcon, Modal, Swal, DeleteForeverRoundedIcon, Box, Grid } from '../../Exports-Modules/Exports';
import { AllEmpleados, RegisterPerson, UpdatePerson, DeletePerson } from '../../Apis/Apis';

import ModalResgister from './ModalResgister/ModalResgister';
import DetailsProduct from './DetailsProduct/DetailsProduct';


//HOOKS
import { EmpleadoActivo, EmpleadoRetiro, EmpleadoTodo } from './Hooks/Hooks';
import Header from './Header/Header';

const InsertClient = () => {

    const EmpleadoActiv = EmpleadoActivo();
    const EmpleadoRetir = EmpleadoRetiro();
    const EmpleadoTod = EmpleadoTodo();

    // MANEJADOR DE ESTADOS PARA CADA FUNCION
    const [dataProduct, setDataProduct] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openDetailsProduct, setOpenDetailsProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });




    //FUNCION PARA ABRIR EL MODAL DE REGISTRO
    const handleOpenModal = () => {
        setOpenModal(true)
    };
    //FUNCION PARA CERRAR EL MODAL DE REGISTRO
    const handleCloseModal = () => {
        setOpenModal(false)
    };

    const handleOpenDetailsProduct = (params) => {
        const product = params.row;
        setSelectedProduct(product);
        setOpenDetailsProduct(true); // Abre el modal de detalles
    };

    const handleCloseDetailProduct = () => {
        setSelectedProduct(null); // Limpia el producto seleccionado
        setOpenDetailsProduct(false);
    };



    //OBTIENE LOS DATOS DE LA TABLA TC
    const get_Empleados = useCallback(async () => {
        setIsLoading(true);
        try {
            const DATA = await AllEmpleados();
            // Asegúrate de que DATA sea siempre un arreglo
            setDataProduct(Array.isArray(DATA) ? DATA : []);
        } catch (error) {
            console.error(error.message);
            alert('Error al cargar los productos. Intente nuevamente.');
            setDataProduct([]); // En caso de error, asegúrate de que sea un arreglo
        } finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        get_Empleados();
    }, [get_Empleados]);



    // REGISTRAR PRODUCTOS
    const onSubmitRegister = async (formData) => {
        setIsLoading(true);
        try {
            // Se envían los datos mediante POST
            const response = await RegisterPerson(formData);

            if (response && response.message === 'Registro insertado correctamente') {
                // Mostrar éxito y actualizar la tabla
                Swal.fire({
                    icon: 'success',
                    title: 'Registro creado exitosamente',
                    showConfirmButton: false,
                    timer: 1500,
                });

                const newData = await AllEmpleados();
                setDataProduct(newData);
                handleCloseModal();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response?.message || 'Error desconocido al registrar el empleado.',
                });
            }
        } catch (error) {
            console.error('Error:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Error al registrar el empleado. Intenta de nuevo.',
            });
        } finally {
            setIsLoading(false);
        }
    };





    // ACTUALIZA LOS PRODUCTOS
    const UpdateProducto = async (id, formData) => {
        setIsLoading(true);
        try {
            const response = await UpdatePerson(id, formData);
            if (response && response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Producto actualizado exitosamente',
                    showConfirmButton: false,
                    timer: 1500,
                });
                const newData = await AllEmpleados();
                setDataProduct(newData);
                handleCloseDetailProduct();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response?.message || 'Error desconocido al actualizar el empleado.',
                });
            }
        } catch (error) {
            console.error('Error:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Error al actualizar el empleado. Intenta de nuevo.',
            });
        } finally {
            setIsLoading(false);
        }
    };




    // ELIMINA EL PRODUCTO SELECCIONADO
    const DeleteProducto = async (id) => {
        setIsLoading(true);
        try {
            // Se pasa el id del empleado a eliminar
            const response = await DeletePerson(id);
            if (response && response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Producto eliminado exitosamente',
                    showConfirmButton: false,
                    timer: 1500,
                });
                // Actualiza la lista de empleados
                const newData = await AllEmpleados();
                setDataProduct(newData);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response?.message || 'Error desconocido al eliminar el empleado.',
                });
            }
        } catch (error) {
            console.error('Error:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Error al eliminar el empleado. Intenta de nuevo.',
            });
        } finally {
            setIsLoading(false);
        }
    };







    //FUNCION PARA LA CAJA DE BUSQUEDA 
    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
    };

    // Filtrado de los datos según la búsqueda
    const filteredData = Array.isArray(dataProduct) ? dataProduct.filter((data) => {
        const searchString = busqueda.toLowerCase();
        return (
            data.NOMBRE.toLowerCase().includes(searchString) ||
            data.FECHA_INGRESO.toLowerCase().includes(searchString)
        );
    }) : [];



    // FUNCION PARA LA ORGANIZACION DE LAS COLUMNAS DE LA TABLA Y ADICIONAL TRAE LA INFORMACION
    const columns = [
        {
            field: 'FECHA_INGRESO',
            headerName: 'Fecha Ingreso',
            flex: 1,
            renderCell: (params) => {
                // Si existe un valor, lo separamos en "fecha" y "hora" usando split('T')
                const rawDate = params.value;
                const formattedDate = rawDate ? rawDate.split('T')[0] : '';
                return <span>{formattedDate}</span>;
            }
        },
        { field: 'NOMBRE', headerName: 'Nombre', flex: 1 },
        { field: 'SALARIO', headerName: 'Salario', flex: 1 },
        { field: 'Estado_Empleado', headerName: 'Estado Empleado', flex: 1 },
        {
            field: '',
            headerName: 'Detalles para actualizar',
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant='soft'
                    size='sm'
                    color='primary'
                    onClick={() => handleOpenDetailsProduct(params)}
                    style={{ display: 'block', margin: 'auto' }}
                >
                    <SearchRoundedIcon fontSize='small' />
                </Button>
            ),
        },
        {
            field: 'Eliminar',
            headerName: 'Eliminar Producto',
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant='soft'
                    size='sm'
                    color='danger'
                    onClick={() =>
                        Swal.fire({
                            title: '¿Estás seguro?',
                            text: 'Esto no se puede deshacer',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#d33',
                            cancelButtonColor: '#3085d6',
                            confirmButtonText: 'Eliminar',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                DeleteProducto(params.row.ID);
                            }
                        })
                    }
                    style={{ display: 'block', margin: 'auto' }}
                >
                    <DeleteForeverRoundedIcon fontSize='small' />
                </Button>
            ),
        },
    ];




    return (
        <>

            <Header
                Box={Box}
                Grid={Grid}
                Card={Card}
                isLoading={isLoading}
                CardContent={CardContent}
                EmpleadoActiv={EmpleadoActiv}
                EmpleadoRetir={EmpleadoRetir}
                EmpleadoTod={EmpleadoTod}
            />



            {/* CAJA DE ESTILO PARA LOS BOTONES DE IMPORTE Y REGISTRO */}
            <div className='d-flex flex-row-reverse'>
                <div className=''>
                    <input placeholder='Buscar...' id='busqueda' className='form-control' style={Styles.Titles} type='search' value={busqueda} onChange={handleBusqueda} />
                </div>

                <div className='p-2'>
                    <Button variant='soft' size='sm' color='success' startDecorator={<AddRoundedIcon fontSize='small' />} onClick={handleOpenModal} >
                        Nuevo Empleado
                    </Button>
                </div>
            </div>
            <p>
            </p>

            {/* TABLA PRINCIPIAL PARA MOSTRAR EL INVENTARIO */}
            <ItemContent className='card border-light'>
                <div className='card border-light scroll-pepe'>
                    <div className='card-body'>


                        {isLoading ? (
                            <div className='d-flex justify-content-center'>
                                <div className='spinner-border' role='status'>
                                    <span className='sr-only'></span>
                                </div>
                            </div>
                        ) : (
                            <div style={{ height: '440px', width: '100%' }}>
                                <StyledDataGrid
                                    rowHeight={33}
                                    columns={columns}
                                    rows={filteredData}
                                    pageSizeOptions={[PAGE_SIZE]}
                                    paginationModel={paginationModel}
                                    getRowId={(data) => data.ID}
                                    onPaginationModelChange={setPaginationModel}
                                    slots={{ pagination: CustomPagination, noRowsOverlay: CustomNoRowsOverlay }}

                                />
                            </div>
                        )}
                    </div>
                </div>
            </ItemContent>

            <ModalResgister
                Modal={Modal}
                Styles={Styles}
                Button={Button}
                openModal={openModal}
                onSubmitRegister={onSubmitRegister}
                handleCloseModal={handleCloseModal}
            />
            <DetailsProduct
                Modal={Modal}
                Styles={Styles}
                Button={Button}
                selectedProduct={selectedProduct}
                UpdateProducto={UpdateProducto}
                openDetailsProduct={openDetailsProduct}
                handleCloseDetailProduct={handleCloseDetailProduct}
            />


        </>
    )
}

const Styles = {
    Titles: {
        fontSize: '15px',
        fontWeight: 'bold',
        fontFamily: 'Nunito',
        color: '#000000'
    }
}

export default InsertClient;
