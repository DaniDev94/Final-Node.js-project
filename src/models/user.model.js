const mongoose = require('mongoose');
//Requerimos bcrypt para poder encriptar la constraseña
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true,
            trim: true
        },
        last: {
            type: String,
            required: true,
            trim: true
        },
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }
},{timestamps:true});


//Encriptamos el password haciendo uso de la función pre()-->pre-guardado, que recibe dos parametros: 1ºParam: 'save' para guardar la encryptación. 2ºParam: función en la que le pasamos como parmetro next para que continue el código una vez terminado el hash.
userSchema.pre('save', function(next) {
    //Hacemos referencia a la propiedad 'password' de nuestro modelo igualandola a 'bcrypt'(paquete npm para la encriptación) y haciendo uso de la función 'hashSync' que nos aporta este paquete para generar asincronamente un hash para la contraseña. Recibiendo dos parametros. 1ºParam: la propiedad que contiene el password y 2ºParam: el numero de veces que se hashsea la contraseña(10 es lo normal)
    this.password = bcrypt.hashSync(this.password, 10);
    //utilizamos next para que continue la ejecución de nuestro código
    next();
})


const User = mongoose.model('users', userSchema);

module.exports = User;


