//Requerimos mongoose para la conexion con la db y nuestro esquema(previamente definido)
const mongoose = require('mongoose');
//Requerimos nuestro modelo
const Fruit = require('../models/fruit.model');
//Requerimos dotenv para atacar a la url de MongoDd Atlas almacenada, como variable de entorno y asi poder usarla.
require('dotenv').config();


const fruits = [{
        name: 'Banana',
        variety: 'Cavendish',
        flavors: 'Sweet',
        season: 'All year'
    },
    {
        name: 'Apple',
        variety: 'Granny smith',
        flavors: 'Acid',
        season: 'Autumn'
    },
    {
        name: 'Mango',
        variety: 'Osteen',
        flavors: 'Semi-sweet',
        season: 'Summer-Autumn'
    }
];


// En este caso, nos conectaremos de nuevo a nuestra base de datos
// pero nos desconectaremos tras insertar los documentos
mongoose
//Añadimos "process.env.MONGODBURL" para accerder a la variable de entorno que almacena la url de MongoDd Atlas
    .connect(process.env.MONGODBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        // Utilizando Fruit.find() obtendremos un array con todos las futas de la db
        const allFruits = await Fruit.find();

        // Si existen frutas previamente, dropearemos la colección(borramos)
        if (allFruits.length) {
            await Fruit.collection.drop(); //La función drop borra la colección
        }
    })
    .catch((err) => console.log(`Error deleting data: ${err}`))
    .then(async () => {
        // Una vez vaciada la db de las frutas, usaremos el array fruits
        // para llenar nuestra base de datos con todas los personajes.
        await Fruit.insertMany(fruits);
    })
    .catch((err) => console.log(`Error creating data: ${err}`))
    // Por último nos desconectaremos de la DB.
    .finally(() => mongoose.disconnect());