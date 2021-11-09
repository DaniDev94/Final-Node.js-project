const mongoose = require('mongoose');
const Store = require('../models/store.model');
require('dotenv').config();


const stores = [
    {
        name: 'TodoFruta S.L',
        address: {
            street: 'Aldonza',
            number: 12,
            cp: 28300,
            province: 'Madrid',
            town: 'Las Rozas'
        },
        telephone: 654789354,
        email: 'todofruta@gmail.com'
    },
    {
        name: 'Manzana Verde',
        address: {
            street: 'La Granja',
            number: 57,
            cp: 29030,
            province: 'Valencia',
            town: 'Gandia'
        },
        telephone: 694785354,
        email: 'manzanaverde@gmail.com'
    },
    {
        name: 'La Raiz',
        address: {
            street: 'Escofina',
            number: 32,
            cp: 34980,
            province: 'Galicia',
            town: 'Vigo'
        },
        telephone: 694782251,
        email: 'laraiz@gmail.com'
    }
];



mongoose
    .connect(process.env.MONGODBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        const allStores = await Store.find();
        if (allStores.length) {
            await Store.collection.drop();
        }
    })
    .catch((err) => console.log(`Error deleting data: ${err}`))
    .then(async () => {
        await Store.insertMany(stores);
    })
    .catch((err) => console.log(`Error creating data: ${err}`))
    .finally(() => mongoose.disconnect());