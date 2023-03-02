const express = require('express');
const { dbConnection } = require('./routes/database/config');
require('dotenv').config();
const cors = require('cors')

console.log(process.env)

//Crear servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use( cors());

//Directorio publico
app.use( express.static('public') );

//Lectura y parseo del body
app.use( express.json() );

//RUTAS 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

const path = require('path'); // Esto al principio, junto al resto de importaciones
 
app.use(express.static(path.join(__dirname, 'public')));
 
app.get('/*', function(req,res) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//TODO CRUD: Eventos


//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});

