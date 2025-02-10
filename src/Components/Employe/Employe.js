
import React, { useCallback, useEffect, useState } from 'react';
import './Styles/Style.css';
import { CustomNoRowsOverlay, ItemContent, StyledDataGrid, PAGE_SIZE, CustomPagination, } from './Styles/Styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, AddRoundedIcon, SearchRoundedIcon, Modal, Swal, Box, Grid } from '../../Exports-Modules/Exports';
import { AllEmpleados, RegisterPerson } from '../../Apis/Apis';

import RegisterEmploye from './RegisterEmploye/RegisterEmploye';
import DetailsEmploye from './DetailsEmploye/DetailsEmploye';


//HOOKS
import { EmpleadoActivo, EmpleadoRetiro } from './Hooks/Hooks';
import Header from './Header/Header';

const InsertClient = () => {

    const EmpleadoActiv = EmpleadoActivo();
    const EmpleadoRetir = EmpleadoRetiro();

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
            headerName: 'Detalles',
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
        }
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

            <RegisterEmploye
                Modal={Modal}
                Styles={Styles}
                Button={Button}
                openModal={openModal}
                onSubmitRegister={onSubmitRegister}
                handleCloseModal={handleCloseModal}
            />
            <DetailsEmploye
                Modal={Modal}
                Styles={Styles}
                Button={Button}
                selectedProduct={selectedProduct}
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
