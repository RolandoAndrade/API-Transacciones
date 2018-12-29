#**TransAPI**

TransAPI es una API REST de un servicio de transacciones y clientes realizada como bono de 5 puntos en el segundo parcial de Ingeniería del Software.

**Endpoints**

- [Clientes](https://github.com/RolandoAndrade/API-Transacciones/wiki/Clientes)

- [Transacciones](https://github.com/RolandoAndrade/API-Transacciones/wiki/Transacciones)

**Empezando**

Para correr un contenedor con el proyecto primero es necesario clonar el proyecto

    git clone https://github.com/RolandoAndrade/API-Transacciones.git

Luego es necesario entrar al directorio scripts y cambiar los permisos del archivo `start.sh`

```bash
    cd API-Transacciones/scripts
    chmod 777 start.sh
    cd ..
 ``` 
 
Posteriormente es necesario correr el contenedor:

```bash
    sudo docker-compose up app
 ``` 
 
Si se quiere usar la misma consola para realizar las peticiones es necesario correr el contenedor en segundo plano:

```bash
    sudo docker-compose up -d app
 ``` 
 
Para detener el contenedor:

```bash
    sudo docker-compose down
 ``` 
 
 Para eliminar cualquier residuo del contenedor:
 
 ```bash
     sudo docker container prune
  ``` 
  
  La aplicación debería correr en el servidor local en el puerto 3000:
  
 ```bash
    telnet localhost 3000
 ``` 
 
**Prerequisitos**

- Docker.
- Docker compose (Incluido en las versiones más recientes de Docker).
- Git.

**Built With**

- `NodeJS` como framework de desarrollo web.
- `npm` como manejador de dependencias
- `PostgreSQL` como base de datos.
- `pg Promises` como controlador de base de datos.
- `Docker` como contenedores.

**Agradecimientos**

@viccalvarezz
