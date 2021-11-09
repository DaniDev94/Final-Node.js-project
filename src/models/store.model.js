const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    address: {
        street: {
            type: String,
            required: true,
            trim: true
        },
        number: {
            type: Number,
            required: true,
        },
        cp: {
            type: Number,
            required: true,
        },
        province: {
            type: String,
            required: true,
            trim: true
        },
        town: {
            type: String,
            required: true,
            trim: true
        },
    },
    telephone: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    //Creamos la relación con el modelo fruit, siendo un array de frutas. Relacionamos los modelos de la db indicando el tipo --> type: mongoose.Types.ObjectId y en la referencia, ponemos el nombre de la colección que queramos referenciar(declarada en el archivo fruit.model.js) en este caso 'fruits' --> ref:'fruits'
    fruits: [{type: mongoose.Types.ObjectId, ref:'fruits'}]
},{timestamps:true});

const Store = mongoose.model('stores', storeSchema );

module.exports = Store;