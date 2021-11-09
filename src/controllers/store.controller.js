const Store = require('../models/store.model');

const getAllStores = async (req, res, next) => {
    try {
        const allStores = await Store.find().populate('fruits',{_id:1, name: 1});
        return res.status(200).json(allStores);
    } catch (err) {
        err.message = 'Stores not found';
        return next(`Error: ${err}.`);
    }
}

const getStoreById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const storeById = await Store.findById(id);
        return res.status(200).json(storeById);
    } catch (err) {
        err.message = 'No store found with this id';
        return next(`Error: ${err}.`);
    }
}


const postNewStore = async (req, res, next) => {
    try {
        const newStore = new Store(req.body);
        const storeSave = await newStore.save();
        return res.status(200).json(storeSave);
    } catch (err) {
        err.message = 'The new store cannot be created, it may already exist';
        return next(`Error: ${err}.`);
    }
}

const putStore = async (req, res, next) => {
    try {
        const { id } = req.params;
        const varyStore = new Store(req.body);
        varyStore._id = id;
        const updateStore = await Store.findByIdAndUpdate(id, varyStore);
        return res.status(200).json(updateStore);
    } catch (err) {
        err.message = 'Store not found, cannot be updated';
        return next(`Error: ${err}.`);
    }
}

//Creamos la función con el metodo patch(o put) para añadir frutas a las tiendas(localizando las tiendas por id) y pusheando las frutas
const patchAddFruitsInStore = async (req, res, next) => {
    try {
        //Obtenemos el id de los parametros de la ruta para indicar el id de la tienda
        const { id } = req.params;
        //Creamos una variable para poder mandar el id de la fruta en la petición del body, creando una nueva propiedad en Insomnia en la que añadiremos el id de la fruta
        const { idFruit } = req.body
        //Actualizamos la tienda buscando por id de la tienda y pusheando el id de la fruta, utilizando las querys de mongoDB. 1ºParam: indicamos el id de la tienda obtenida de los parametros de la ruta. 2ºParam: Utilizando la query de mongo, pusheamos en la propiedad 'fruits' de store.model.js en la que haciamos la relación entre modelos, el idFruit que correspondera al id de la fruta.
        const updateStoreAddingFruit = await Store.findByIdAndUpdate(id,{$push:{fruits: idFruit}});
        return res.status(200).json(updateStoreAddingFruit);
    } catch (err) {
        err.message = 'Fruit or store not found, fruit cannot be added to store';
        return next(`Error: ${err}.`);
    }
}

const deleteStore = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleteStore = await Store.findByIdAndDelete(id);
        return res.status(200).json(deleteStore);
    } catch (err) {
        err.message = 'Store not found, could not be removed';
        return next(`Error: ${err}.`);
    }
}

module.exports = {
    getAllStores,
    getStoreById,
    postNewStore,
    putStore,
    patchAddFruitsInStore,
    deleteStore
}