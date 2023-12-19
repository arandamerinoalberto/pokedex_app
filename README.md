Instrucciones para Iniciar el Proyecto Pokedex - Frontend

Configuración del Frontend
1. Instalación de Dependencias
En la carpeta del frontend, ejecuta el siguiente comando para instalar las dependencias:

npm install

2. Iniciar la Aplicación
Ejecuta el siguiente comando para iniciar la aplicación frontend:

npm start
La aplicación estará disponible en http://localhost:3000 por defecto.

Configuración del Backend
1. Instalación de Dependencias
En la carpeta del backend, ejecuta el siguiente comando para instalar las dependencias:

npm install

2. Configuración de Variables de Entorno
Crea un archivo llamado .env en la carpeta del backend y configura las variables de entorno necesarias. Puedes utilizar el siguiente formato como ejemplo:

MONGODB_URI=mongodb://127.0.0.1:27017/pokedexDB
PORT=3001

Ajusta el valor de MONGODB_URI según tu configuración de MongoDB.

3. Poblar la Base de Datos
Para poblar la base de datos, ejecuta el siguiente comando:

node populateDB.js
Este script utilizará la API de PokeAPI para obtener información de Pokémon y la almacenará en la base de datos MongoDB.

4. Iniciar el Servidor
Ejecuta el siguiente comando para iniciar el servidor:

node server.js
El servidor se ejecutará en el puerto configurado en el archivo .env (por defecto, en el puerto 3001).

Verificación
Abre tu navegador y visita http://localhost:3000 para verificar la aplicación Pokedex. Puedes realizar solicitudes a las siguientes rutas en Postman para comprobar el funcionamiento del backend:

Obtener todos los Pokémon: GET http://localhost:3001/pokemons
Obtener un Pokémon por ID: GET http://localhost:3001/pokemons/:id
Filtrar Pokémon por nombre: GET http://localhost:3001/pokemons/nombre/:nombre
Filtrar Pokémon por evolución: GET http://localhost:3001/pokemons/evolucion/:evolucion
Filtrar Pokémon por tipo: GET http://localhost:3001/pokemons/tipo/:tipo