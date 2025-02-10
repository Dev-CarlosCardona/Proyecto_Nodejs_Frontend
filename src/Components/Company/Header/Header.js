import React from 'react'

const Header = ({
    Box,
    Grid,
    Card,
    isLoading,
    CardContent,
    EmpleadoActiv,
    EmpleadoRetir,
    EmpleadoTod
}) => {
    return (
        <>

            <Box sx={{ flexGrow: 1 }}>
                <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
                    <div className='card-body'>
                        <div className='text-center'>
                            <div className='mb-0 title-mychange'>SOLICITUD COMPANY</div>
                        </div>
                    </div>
                </div>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ marginTop: '5%', marginBottom: '4%' }}>
                    <Grid item xs={2} sm={4} md={4}>
                        <Box position='relative' width='100%'>

                            <Card sx={{ bgcolor: '#dec6b26e', borderRadius: '15px', boxShadow: 3 }}>
                                <CardContent>
                                    <Box sx={{ textAlign: 'center' }}>
                                        {isLoading ? (
                                            <div className='spinner-border text-warning' role='status' />
                                        ) : (
                                            <div style={{ color: '#ed6c02', fontWeight: 'bold', fontFamily: 'Nunito' }}>
                                                Total de Empleados: {EmpleadoTod && EmpleadoTod[0] ? EmpleadoTod[0].total : `0`}
                                            </div>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <Box position='relative' width='100%'>

                            <Card sx={{ bgcolor: '#c0d8c16b', borderRadius: '15px', boxShadow: 3 }}>
                                <CardContent>
                                    <Box sx={{ textAlign: 'center' }}>
                                        {isLoading ? (
                                            <div className='spinner-border text-success' role='status' />
                                        ) : (
                                            <div style={{ color: '#2e7d32', fontWeight: 'bold', fontFamily: 'Nunito' }}>
                                                Empleado Activos: {EmpleadoActiv && EmpleadoActiv[0] ? EmpleadoActiv[0].total : `0`}
                                            </div>

                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <Box position='relative' width='100%'>

                            <Card sx={{ bgcolor: '#e9979764', borderRadius: '15px', boxShadow: 3 }}>
                                <CardContent>
                                    <Box sx={{ textAlign: 'center' }}>
                                        {isLoading ? (
                                            <div className='spinner-border text-danger' role='status' />
                                        ) : (
                                            <div style={{ color: '#d63d3d', fontWeight: 'bold', fontFamily: 'Nunito' }}>
                                                Empleado Retiro: {EmpleadoRetir && EmpleadoRetir[0] ? EmpleadoRetir[0].total : `0`}
                                            </div>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            </Box >
        </>
    )
}

export default Header;