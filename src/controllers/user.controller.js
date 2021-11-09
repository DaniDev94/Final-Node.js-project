const User = require('../models/user.model');
//Requerimos bcrypt par poder hacer la comparación de las contraseñas
const bcrypt = require('bcrypt');
//Requerimos la libreria de JWT para generar los tokens de sesión
const JWT = require('jsonwebtoken');
const validation = require('../utils/validations/user.validation');
//Para utilizar las variables de entorno 
require('dotenv').config()

const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find();
        return res.status(200).json(allUsers);
    } catch (err) {
        err.message = 'Users not found';
        return next(`Error: ${err}.`);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userById = await User.findById(id);
        return res.status(200).json(userById);
    } catch (err) {
        err.message = 'No user found with this id';
        return next(`Error: ${err}.`);
    }
}


const postNewUser = async (req, res, next) => {
    try {
        //Validación de la contraseña y el email
        if(!validation.validationPassword(req.body.password) || !validation.validationEmail(req.body.email)){
            const error = new Error;
            error.status = 400;
            error.message = 'Password or email with minimums not obtained';
            return next(error);
        }
        const newUser = new User(req.body);
        const saveUser = await newUser.save();
        return res.status(200).json(saveUser);
    } catch (err) {
        err.message = 'The new user cannot be created, it may already exist';
        return next(`Error: ${err}.`);
    }
}

//Estrategia para el login
const loginUser = async (req, res, next) => {
    try {
        // console.log(req.body.email)--> Muestra el email
        //Sacamos el usuario de la db y para ello, tenemos que buscar por un campo obligatorio(suele buscarse por el email o el nombre se usuario).Buscamos en la propiedad email la información obtenida de la petición del body en el email.
        const userInDb = await User.findOne({email: req.body.email})
        //console.log(userInDb)--> con findOne nos muestra el usuario con la primera coincidencia con el email (introducido en Insomnia) 
        //Comparamos la contraseña origianl(sin hash) introducida en el body de Insomnia, con la contraseña hashseada del usuario. Con compareSync realizamos una comparación asincrona
        if(bcrypt.compareSync(req.body.password, userInDb.password)){
            //Una vez comparamos la contraseña la pasamos a null para no mostrar la información que contenga
            userInDb.password = null;
            // console.log('Password correct'); Comrobamos que las contraseñas coinciden
            //Trabajamos sobre jsonwebtoken importado en el archivo, esta libreria tiene una función para generar tokens llamada sign y en la función sign,  creamos las propiedades del token y le indicamos lo que queremos añadir a cada propiedad del token, en este caso añadimos el id del usuario encontrado en la constante userInDb, el nombre y el email. Añadimos la variable de entorno que almacena la contraseña(requiriendo dotenv) para los tokens y añadimos la expiración del token que queramos
            const generateToken = JWT.sign({id: userInDb._id, email: userInDb.email},process.env.JWT_SECRET, {expiresIn:'1d'});
            //Una vez creado el token en el paso anterior enviamos la respuesta
            res.status(200).json(generateToken);
        } 
    } catch (err) {
        err.message ='Login error';
        return next(`Error: ${err}.`);
        
    }
}


//Estrategia para el logout
const logoutUser = async (req, res, next) => {
    try {
        //Borramos el token para quitarle el acceso 
        const removeToken = null;
        res.status(200).json(removeToken)
    } catch (err) {
        err.message ='Logout error';
        return next(`Error: ${err}.`);
    }
}



const putUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const varyUser = new User(req.body);
        //Lo igulamos para que haya match entre el id y el usuario
        varyUser._id = id;
        const updateUser = await User.findByIdAndUpdate(id, varyUser);
        return res.status(200).json(updateUser);
    } catch (err) {
        err.message = 'User not found, cannot be updated';
        return next(`Error: ${err}.`);
    }
}


const patchUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const varyUser = new User(req.body);
        varyUser._id = id;
        const updateUser = await User.findByIdAndUpdate(id, varyUser);
        return res.status(200).json(updateUser);
    } catch (err) {
        err.message = 'User not found, could not update the field';
        return next(`Error: ${err}.`);
    }
}


const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleteUser = await User.findByIdAndDelete(id);
        return res.status(200).json(deleteUser);
    } catch (err) {
        err.status = 404;
        err.message = 'User not found, could not be removed';
        return next(`Error: ${err}.`);
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    postNewUser,
    loginUser,
    logoutUser,
    putUser,
    patchUser,
    deleteUser
}