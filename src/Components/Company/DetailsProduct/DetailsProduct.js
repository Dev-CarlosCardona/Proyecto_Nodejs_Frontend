import React, { useState, useEffect } from 'react';

const DetailsProduct = ({ Modal, Styles, Button, selectedProduct, UpdateProducto, openDetailsProduct, handleCloseDetailProduct }) => {
  const [formData, setFormData] = useState({
    FECHA_INGRESO: '',
    NOMBRE: '',
    SALARIO: '',
    Estado_Empleado: ''
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Función para formatear la fecha en formato yyyy-MM-dd
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Función para formatear el salario (se agrega punto como separador de miles)
  const formatCurrency = (value) => {
    if (!value) return '';
    const stringValue = String(value);
    return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Cargar los datos del empleado seleccionado
  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        FECHA_INGRESO: selectedProduct.FECHA_INGRESO ? formatDateForInput(selectedProduct.FECHA_INGRESO) : '',
        NOMBRE: selectedProduct.NOMBRE || '',
        SALARIO: selectedProduct.SALARIO ? String(selectedProduct.SALARIO) : '',
        Estado_Empleado: selectedProduct.Estado_Empleado || ''
      });
    }
  }, [selectedProduct]);

  // Habilitar el botón cuando todos los campos tengan algún valor (sin trim)
  useEffect(() => {
    const allFieldsFilled =
      formData.FECHA_INGRESO !== '' &&
      formData.NOMBRE !== '' &&
      formData.SALARIO !== '' &&
      formData.Estado_Empleado !== '';
    setIsButtonDisabled(!allFieldsFilled);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Permitir solo dígitos en el campo SALARIO
  const handleSalaryChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setFormData({
      ...formData,
      SALARIO: rawValue
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseFloat(formData.SALARIO) < 0) {
      alert("El salario no puede ser negativo");
      return;
    }
    // Llamar a la función de actualización pasando el id y el formulario (sin formatear el salario)
    UpdateProducto(selectedProduct.ID, formData);
  };

  return (
    <Modal
      title="Detalles para actualizar"
      width={800}
      footer={null}
      open={openDetailsProduct}
      onCancel={handleCloseDetailProduct}
    >
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column mb-3">
          <div className="d-flex">
            <div className="p-2 col-md-6">
              <label htmlFor="FECHA_INGRESO" className="form-label text-muted">Fecha Ingreso</label>
              <input
                className="form-control"
                type="date"
                style={Styles.Titles}
                id="FECHA_INGRESO"
                name="FECHA_INGRESO"
                value={formData.FECHA_INGRESO}
                onChange={handleChange}
              />
            </div>
            <div className="p-2 col-md-6">
              <label htmlFor="NOMBRE" className="form-label text-muted">Nombre Completo</label>
              <input
                className="form-control"
                type="text"
                style={Styles.Titles}
                id="NOMBRE"
                name="NOMBRE"
                value={formData.NOMBRE}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="d-flex">
            <div className="p-2 col-md-6">
              <label htmlFor="SALARIO" className="form-label text-muted">Salario</label>
              <input
                className="form-control"
                type="text"
                style={Styles.Titles}
                id="SALARIO"
                name="SALARIO"
                value={formatCurrency(formData.SALARIO)}
                onChange={handleSalaryChange}
              />
            </div>
            <div className="p-2 col-md-6">
              <label htmlFor="Estado_Empleado" className="form-label text-muted">Estado del Empleado</label>
              <select
                className="form-select"
                style={Styles.Titles}
                id="Estado_Empleado"
                name="Estado_Empleado"
                value={formData.Estado_Empleado}
                onChange={handleChange}
              >
                <option value="">Seleccione el estado</option>
                <option value="Activo">Activo</option>
                <option value="Retiro">Retiro</option>
              </select>
            </div>
          </div>
          <div className="d-flex flex-row-reverse">
            <div className="p-2">
              <Button variant="soft" size="sm" color="danger" onClick={handleCloseDetailProduct}>
                Cancelar
              </Button>
            </div>
            <div className="p-2">
              <Button variant="soft" size="sm" color="success" type="submit" disabled={isButtonDisabled}>
                Actualizar Producto
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default DetailsProduct;
