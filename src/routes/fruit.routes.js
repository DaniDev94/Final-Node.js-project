//Requerimos express con sus rutas almacenadolas en una variavle
const FruitRoutes = require('express').Router();

//Nos tremos las funciones con "require", que realizan los distintos metodos http alojados en la carpeta controllers, dentro de su controlador correspondiente. Para importar funciones:
const { getAllFruits, getFruitById, postNewFruit, putFruit, patchFruit, deleteFruit } = require('../controllers/fruit.controller')

//Declaramos las rutas con los distintos metodos http. 1ºParam: ruta. 2ºParam: Función importada de la carpeta controllers que corresponda con la ruta, donde definiremos los distintos metodos que vayamos a realizar.
FruitRoutes.get('/', getAllFruits);
FruitRoutes.get('/:id', getFruitById);
FruitRoutes.post('/', postNewFruit);
FruitRoutes.put('/:id', putFruit);
FruitRoutes.patch('/:id', patchFruit);
FruitRoutes.delete('/:id', deleteFruit);

//Exportamos las rutas a main.js para declarar la ruta principal
module.exports = FruitRoutes;