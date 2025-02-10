import React from 'react';

const ListPermissions = ({
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ExpandMoreIcon,
  handleCheckboxChange,
  userPermissions
}) => {
  return (
    <div>
      <List>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className='form-check'>
              <input
                className='form-check-input'
                onChange={(e) => handleCheckboxChange("1.0", e.target.checked)}
                type='checkbox'
                value="1.0"
                id='defaultCheck1'
                checked={userPermissions.some((p) => p.Id_Modulo === "1.0")}
              />
              <label className='form-check-label' htmlFor='defaultCheck1'>
                personal campaña
              </label>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  onChange={(e) => handleCheckboxChange("1.1", e.target.checked)}
                  type='checkbox'
                  value="1.1"
                  id='defaultCheck2'
                  checked={userPermissions.some((p) => p.Id_Modulo === "1.1")}
                />
                <label className='form-check-label' htmlFor='defaultCheck2'>
                  1.1 Solicitud
                </label>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  onChange={(e) => handleCheckboxChange("1.2", e.target.checked)}
                  type='checkbox'
                  value="1.2"
                  id='defaultCheck3'
                  checked={userPermissions.some((p) => p.Id_Modulo === "1.2")}
                />
                <label className='form-check-label' htmlFor='defaultCheck3'>
                  1.2 Empleados
                </label>
              </div>
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Sección Admin */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className='form-check'>
              <input
                className='form-check-input'
                onChange={(e) => handleCheckboxChange("0.0", e.target.checked)}
                type='checkbox'
                value="0.0"
                id='defaultCheck25'
                checked={userPermissions.some((p) => p.Id_Modulo === "0.0")}
              />
              <label className='form-check-label' htmlFor='defaultCheck25'>
                Admin
              </label>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  onChange={(e) => handleCheckboxChange("0.1", e.target.checked)}
                  type='checkbox'
                  value="0.1"
                  id='defaultCheck26'
                  checked={userPermissions.some((p) => p.Id_Modulo === "0.1")}
                />
                <label className='form-check-label' htmlFor='defaultCheck26'>
                  0.1 Permisos
                </label>
              </div>
            </List>
          </AccordionDetails>
        </Accordion>
      </List>
    </div>
  );
};

export default ListPermissions;
