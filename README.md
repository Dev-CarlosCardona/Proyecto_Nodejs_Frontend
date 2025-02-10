# Proyecto Frontend

Este proyecto fue creado con [Create React App]. Para que la aplicación funcione correctamente, es necesario configurar la conexión al servidor a través de una variable de entorno.

## Configuración del Archivo `.env`

1. **Crear el archivo `.env`**  
   En la raíz del proyecto, crea un archivo llamado `.env`.

2. **Definir la variable de entorno**  
   Agrega la siguiente línea en el archivo `.env`, reemplazando `IP_DE_TU_PC` y `PUERTO` con la dirección IP de tu PC y el puerto que deseas utilizar:

   ```env
   REACT_APP_SERVER=IP_DE_TU_PC:PUERTO

## Si deseas desplegar la aplicación en un servidor, deberás generar una versión compilada y optimizada. Para hacerlo, sigue estos pasos:

1. **Ejecuta el comando de build:**

npm run build

Al finalizar, se creará una carpeta llamada build en la raíz del proyecto.
Esta carpeta contiene una versión optimizada y lista para producción que puedes desplegar en cualquier servidor estático.

Nota sobre node_modules
Este repositorio no incluye la carpeta node_modules. La razón es que:

Dependencias Generadas: La carpeta node_modules contiene las dependencias del proyecto, las cuales se pueden instalar fácilmente usando npm install o yarn install.
Tamaño y Rendimiento: Incluir node_modules en el repositorio ocasiona problemas de tamaño y rendimiento, además de potenciales conflictos de versiones.
Buenas Prácticas: Es una práctica estándar en proyectos de JavaScript ignorar node_modules para mantener un repositorio limpio y evitar la inclusión de archivos generados o temporales.
Para instalar las dependencias y configurar el entorno de desarrollo, simplemente ejecute:

bash
Copiar
npm install
Con este comando se descargarán e instalarán todas las dependencias necesarias definidas en el archivo package.json

{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/icons-material": "^6.4.3",
    "@mui/joy": "^5.0.0-beta.51",
    "@mui/lab": "^6.0.0-beta.26",
    "@mui/material": "^6.4.3",
    "@mui/x-charts": "^7.26.0",
    "@mui/x-data-grid": "^7.26.0",
    "@mui/x-date-pickers": "^7.26.0",
    "@mui/x-tree-view": "^7.26.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.2.0",
    "@testing-library/user-event": "^14.6.1",
    "antd": "^5.23.4",
    "axios": "^1.7.9",
    "cra-template": "1.2.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.1.5",
    "react-scripts": "5.0.1",
    "sweetalert2": "^11.16.0",
    "web-vitals": "^4.2.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
