# Alkemy Wallet API

## Descripcion

Implementacion de una API REST para la gestion de una billetera virtual

## Stack tecnologico

- Node.js
- Express.js
- Sequelize
- MySQL
- Swagger

## Requisitos previos

- Node.js (version 14 en adelante)
- MySQL

## Puesta en marcha

1. Clonar el proyecto desde Github: `git clone https://github.com/lucascarnero/alkemy-wallet-api`
2. Cambiarse a la carpeta del repositorio que se clono: `cd alkemy-wallet-api`
3. Crear el archivo `.env`, que contendra las variables de ambiente para que el proyecto pueda funcionar: `cp .env.example .env`
4. Configurar apropiadamente las variables de ambiente:

   - `DB_NAME` nombre de la base de datos
   - `DB_USER` usuario para la conexion a la base de datos (debe tener permisos sobre `DB_NAME`)
   - `DB_PWD` contrasena para la conexion a la base de datos
   - `DB_HOST` hostname o IP del servidor de base de datos
   - `DB_PORT` puerto para conexion a la base de datos (en MySQL por defecto es 3306)
   - `ROLE_ADMIN_ID` es el ID del rol de usuarios administradores; al desplegar el proyecto por defecto se va a generar con ID 1 (no debiera modificarse)
   - `APP_PORT` puerto sobre el que se desplegara la aplicacion
   - `ITEMS_PER_PAGE` items a mostrar por cada pagina (se usa al consultar los endpoints que retornan listados de elementos)
   - `NODE_ENV` entorno donde se despliega la aplicacion (development, testing o production)
   - `TOKEN_SECRET` es el secreto para la generacion de tokens JWT (valorizar a una cadena de caracteres aleatoria)
   - `TOKEN_EXPIRES_IN` tiempo de expiracion del token (se expresa en segundos)

5. Instalar las dependencias del proyecto: `npm install`
6. Ejecutar las migraciones para inicializar la base de datos del proyecto: `npx sequelize-cli db:migrate`
7. Ejecutar los seeds para inicializar las tablas en la base de datos del proyecto: `npx sequelize-cli db:seed:all`
8. Iniciar el proyecto `node index.js`
