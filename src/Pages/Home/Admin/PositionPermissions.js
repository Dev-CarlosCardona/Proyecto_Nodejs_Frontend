import React, { useEffect, useState } from 'react';
import {
  List,
  ExpandMoreIcon,
  notification,
  Button,
  ArrowLeftRoundedIcon,
  ArrowRightRoundedIcon,
} from "../../../Exports-Modules/Exports";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "../../Home/Style/Style";
import { cargoUsersPermissions } from "../../../Apis/Apis";
import Config from "../../../Auth/Config";
import Service from "../../../Machine/Service";
import ListPermissions from "./ListPermissions";
import apiClient from "../../../Service/Service";

const PositionPermissions = () => {
  const { Servidor } = Service();
  const { InsertAndDeletePermissions } = Config();
  const [api, contextHolder] = notification.useNotification();
  const [ListCargoUser, setListCargoUser] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [originData, setOriginData] = useState([]);
  const [selectUser, setSelectUser] = useState(null);
  const [userPermissions, setUserPermissions] = useState([]);

  const [modificaciones, setModificaciones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  // Obtener la lista de cargos
  const getListCargoUsers = async () => {
    const data = await cargoUsersPermissions();
    setListCargoUser(data);
    setOriginData(data);
  };

  // Manejo del checkbox, actualiza userPermissions y registra la modificación
  const handleCheckboxChange = (permissionId, isChecked) => {
    // Actualiza el estado local de permisos
    setUserPermissions(prev => {
      const exists = prev.find(p => p.Id_Modulo === permissionId);
      if (isChecked && !exists) {
        return [...prev, { Id_Modulo: permissionId }];
      } else if (!isChecked && exists) {
        return prev.filter(p => p.Id_Modulo !== permissionId);
      }
      return prev;
    });

    // Registra la modificación 
    setModificaciones(prev => {
      // Elimina cualquier modificación previa para este permiso
      const filtered = prev.filter(item => item.permissionId !== permissionId);
      // Agrega la nueva acción
      return [...filtered, { permissionId, action: isChecked ? "insert" : "delete" }];
    });
  };

  // Obtener los permisos del cargo seleccionado (para marcar los checkboxes)
  const getUserPermission = async (nombreCargo) => {
    try {
      const response = await apiClient.get(
        `http://${Servidor}/API/UPDATE-USER-PERMISSIONS/${nombreCargo}`
      );
      const data = response.data;
      setUserPermissions(data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        api.error({ message: "No tiene permisos asignados" });
      } else {
        api.error({ message: "Error interno del server" });
      }
    }
  };

  // Guardar las modificaciones, envía cada cambio individualmente
  const savePermissions = async () => {
    try {
      const promises = modificaciones.map(mod => {
        return apiClient.put(InsertAndDeletePermissions, {
          action: mod.action,
          Nombre_Cargo_Normalizado: selectUser, 
          Id_Modulo: mod.permissionId
        });
      });
      await Promise.all(promises);
      setModificaciones([]);
      api.success({ message: "Permisos guardados correctamente" });
    } catch (error) {
      api.error({ message: "Error interno del servidor" });
    }
  };

  useEffect(() => {
    getListCargoUsers();
  }, []);

  // Función para filtrar los cargos según la búsqueda
  const Filtrar = (search) => {
    const resultSeacrh = originData.filter(element =>
      element.Nombre_Cargo_Normalizado.toLowerCase().includes(search.toLowerCase())
    );
    setListCargoUser(resultSeacrh);
  };

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
    Filtrar(e.target.value);
  };

  // Al hacer clic en un cargo, se obtienen sus permisos
  const handleModuleClick = (name) => {
    setSelectUser(name);
    getUserPermission(name);
  };

  // Funciones de paginación
  const handleShowNextPage = () => setCurrentPage(currentPage + 1);
  const handleShowPreviousPage = () => setCurrentPage(currentPage - 1);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, ListCargoUser.length);
  const currentPageData = ListCargoUser.slice(startIndex, endIndex);

  return (
    <>
      {contextHolder}
      <div className="text-center">
        <div className="mb-0 title-import">Permisos para cargos</div>
      </div>
      <div className="card border-light">
        <div className="card-body">
          <div className="d-flex">
            <div className="p-2 flex-grow-1 bd-highlight">
              <div className="p-2 me-auto"></div>
            </div>
            <div className="p-2">
              <input
                value={busqueda}
                onChange={handleBusqueda}
                placeholder="Buscar..."
                type="search"
                className="form-control p-2"
              />
            </div>
            <div className="p-2">
              {currentPage > 1 && (
                <Button variant="solid" color="primary" size="sm" onClick={handleShowPreviousPage}>
                  <ArrowLeftRoundedIcon fontSize="medium" />
                </Button>
              )}
            </div>
            <div className="p-2">
              {currentPage * rowsPerPage < ListCargoUser.length && (
                <Button variant="solid" color="primary" size="sm" onClick={handleShowNextPage}>
                  <ArrowRightRoundedIcon fontSize="medium" />
                </Button>
              )}
            </div>
          </div>
          <table className="table table-sm table-borderless table-hover">
            <thead>
              <tr>
                <th className="font-weight-bold" scope="col">Cargo</th>
                <th className="font-weight-bold text-center" scope="col">Módulos</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData && currentPageData.map((data) => (
                <tr key={data.Id_Normalizado}>
                  <td className="text-muted">{data.Nombre_Cargo_Normalizado}</td>
                  <td className="text-muted text-center">
                    <button
                      onClick={() => handleModuleClick(data.Nombre_Cargo_Normalizado)}
                      className="btn btn-secondary btn-sm"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#ModalPermissions"
                    >
                      <i className="bi bi-key-fill" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para editar permisos */}
      <div
        className="modal fade"
        id="ModalPermissions"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title text-lowercase" id="exampleModalLabel">
                Permisos para: <div className="text-lowercase fw-bolder">{selectUser}</div>
              </div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <ListPermissions
                List={List}
                Accordion={Accordion}
                AccordionSummary={AccordionSummary}
                AccordionDetails={AccordionDetails}
                ExpandMoreIcon={ExpandMoreIcon}
                userPermissions={userPermissions}
                handleCheckboxChange={handleCheckboxChange}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={savePermissions}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PositionPermissions;
