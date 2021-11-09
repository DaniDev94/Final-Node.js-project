//Requerimos el modelo correspondiente
const Fruit = require('../models/fruit.model');

//Al trabajar con base de datos siempre es asincrono por lo que utilizaremos el async/await para manejar las peticiones y el try/catch para la solución o captura de errores.

//Creamos la primera función con la que obtendremos todas las frutas de nuestra db utilizando el metodo "GET".
const getAllFruits = async (req, res, next) => {
    try {
        //Buscamos todas las frutas de nuestra colección
        const allFruits = await Fruit.find();
        return res.status(200).json(allFruits);
    } catch (err) {
        err.message = 'Fruits not found';
        return next(`Error: ${err}.`);
    }
}


//Obtención de las frutas por Id utilizando el metodo "GET" 
const getFruitById = async (req, res, next) => {
    try {
        //Obtenemos el id de los parametros de la ruta
        const { id } = req.params;
        //Buscamos por id
        const fruitById = await Fruit.findById(id);
        return res.status(200).json(fruitById)
    } catch (err) {
        err.message = 'No fruit found with this id';
        return next(`Error: ${err}.`);
    }
}

//Creación de una nueva fruta utilizando el metodo "POST"
const postNewFruit = async (req, res, next) => {
    try {
        //Para recuperar todos lo campos en el petición del body 
        const newFruit = new Fruit(req.body);
        //Para guardar la fruta en la db
        const fruitSave = await newFruit.save();
        return res.status(200).json(fruitSave);
    } catch (err) {
        err.message = 'The new fruit cannot be created, it may already exist';
        return next(`Error: ${err}.`);
    }
}

//Modificación del bloque de parametros completo de una fruta utilizando el metodo "PUT"
const putFruit = async (req, res, next) => {
    try {
        //Buscamos por Id en los parametros
        const { id } = req.params;
        //Recupere todos lo campos en la petición del body
        const varyFruit = new Fruit(req.body);
        //Igulamos el id del body de la nueva fruta al id de la petición recogida en los parametros para que haya una coincidencia con id y actulice los campos
        //Para que haya match con el id de la ruta al id del objeto
        varyFruit._id = id;
        //Actualizamos los campos obtenidos buscando por id de los parametros y actualizando la fruta 
        const updateFruit = await Fruit.findByIdAndUpdate(id, varyFruit);
        //Devolvemos la respuesta si encotramos el id
        return res.status(200).json(updateFruit);
    } catch (err) {
        //Personalizamos el mensaje de error
        err.message = 'Fruit not found, cannot be updated';
        return next(`Error: ${err}.`);
    }
}


// Modificación de un único parametro de la fruta(igual que le put solo que le patch puede modificar un unico campo o añadirlo) Mas adelante utilizaremos este metodo para relacionar modelos utilizando el metodo "PATCH"
const patchFruit = async (req, res, next) => {
    try {
        //Buscamos por Id en los parametros de la ruta
        const { id } = req.params;
        //Recupere todos lo campos en la petición del body
        const varyFruit = new Fruit(req.body);
        //Igulamos el id del body al id de la petición que recupera los parametros.
        varyFruit._id = id;
        //Le indicamos que por id(filtro) nos actualice los campos introducidos(proyección) --> Query de MongoDB
        //Actualizamos los campos obtenidos buscando por id
        const updateFruit = await Fruit.findByIdAndUpdate(id, varyFruit);
        //Devolvemos la respuesta si encotramos el id
        return res.status(200).json(updateFruit);
    } catch (err) {
        err.message = 'Fruit not found, could not update the field';
        return next(`Error: ${err}.`);
    }
}


//Eliminación de la fruta utilizando el metodo "DELETE"
const deleteFruit = async (req, res, next) => {
    try {
        //Buscamos por Id en los parametros de la ruta
        const { id } = req.params;
        //Borramos la fruta buscando por Id
        const deleteFruit = await Fruit.findByIdAndDelete(id);
        return res.status(200).json(deleteFruit);
    } catch (err) {
        //Personalización de los mensajes de error dentro de cada metodo.
        err.message = 'Fruit not found, could not be removed';
        return next(`Error: ${err}.`);
    }
}

//Exportamos nuestras funciones
module.exports = {
    getAllFruits,
    getFruitById,
    postNewFruit,
    putFruit,
    patchFruit,
    deleteFruit
}