//Requerimos mongoose para conectarnos a la db
const mongoose = require('mongoose');
//Requerimos dotenv para utilizar las variables de entorno
require('dotenv').config();
//Almacenamos nuestra variable de entorno en un variable
const urlDb = process.env.MONGODBURL;


//Para conectar con la db de Mongo Atlas(cuando trabajamos en una db es siempre asincrono)
const connectWhithDb = async () => {
    try {
        const db = await mongoose.connect(urlDb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const { name, host } = db.connection;
        console.log(`Connected in the db with the name ${name} in host: ${host} `);
    } catch (err) {
        console.log(`connection error ${err}`);
    }
}


//Exportamos la funcion asincrona creada
module.exports = {
    connectWhithDb
};