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