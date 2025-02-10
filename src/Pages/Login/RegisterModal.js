import React, { useState } from 'react';
import { Box, TextField, Button, Select, MenuItem, InputLabel, FormControl, Modal } from '@mui/material';
import Swal from 'sweetalert2';
import Config from '../../Auth/Config';
import apiClient from '../../Service/Service';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const RegisterModal = ({ open, handleCloseModalRegister }) => {
  const { registerURL } = Config();
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    cargo: '',
    usuario: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.nombre || !form.apellido || !form.cargo || !form.usuario || !form.password) {
      return Swal.fire({ icon: 'warning', text: 'Todos los campos son obligatorios.' });
    }
    try {
      const response = await apiClient.post(registerURL, form);
      Swal.fire('Registrado', response.data.message, 'success');
      handleCloseModalRegister();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error.response?.data?.message || 'Error en el registro.',
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModalRegister} // Usamos onClose para cerrar el modal
    >
      <Box sx={style}>
        <h2>Registrar Usuario</h2>
        <TextField
          fullWidth
          margin="normal"
          label="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Apellido"
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="cargo-label">Cargo</InputLabel>
          <Select
            labelId="cargo-label"
            name="cargo"
            value={form.cargo}
            label="Cargo"
            onChange={handleChange}
          >
            <MenuItem value="Empleado">Empleado</MenuItem>
            <MenuItem value="Administrador">Administrador</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label="Usuario"
          name="usuario"
          value={form.usuario}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Contraseña"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />


        <Button
          variant="contained"
          color='success'
          fullWidth
          sx={{ marginTop: '16px' }}
          onClick={handleSubmit}
        >
          Registrar
        </Button>
        {/* Botón de cerrar */}
        <Button
          variant="outlined"
          color='error'
          fullWidth
          sx={{ marginTop: '16px' }}
          onClick={handleCloseModalRegister}
        >
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default RegisterModal;
