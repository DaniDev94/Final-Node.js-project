const StoreRoutes = require('express').Router();

const { getAllStores, getStoreById,
    postNewStore, putStore, patchAddFruitsInStore, deleteStore } = require('../controllers/store.controller');

StoreRoutes.get('/', getAllStores);
StoreRoutes.get('/:id', getStoreById);
StoreRoutes.post('/', postNewStore);
StoreRoutes.put('/:id', putStore);
StoreRoutes.patch('/addFruits/:id', patchAddFruitsInStore);
StoreRoutes.delete('/:id', deleteStore);

module.exports = StoreRoutes;