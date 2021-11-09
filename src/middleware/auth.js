//Requerimos el paquete jsonwebtoken para trabajar con los tokens ya que vamos a tener que comprobar el token
const JWT = require('jsonwebtoken');
//Requerimos el modelo del usuario
const User = require('../models/user.model');
//Para utilizar las variables de entorno 
require('dotenv').config()

//Creamos la función para realizar la autorización/securización de las rutas
const isAuth = async (req, res, next) => {
    try {
        //Creamos una variable para recoger la token registrado en Insomnia(Bearer Token)En esta linea vamos al header/authorization en Insomnia para recoger el token introducido en la petición del header
        const token = req.headers.authorization;
        // console.log(token)-->Muestra el token

        //Ahora tenemos que limpiar en token ya que siempre comienza con bearer + el token. Con remplace podemos remplazar el bearer por string vacio
        const cleanToken = token.replace('Bearer ', '');
        // console.log('Clean token-->',cleanToken)--> Token limpio

        //Ahora verificamos el token utilizando la libreria de jsonwebtoken con verify que recibe dos parametros. 1ºParam: el token limpio en string y la contraseña declarada como variable de entorno(reqerimos dotenv)
        const verifyToken = JWT.verify(cleanToken, process.env.JWT_SECRET);
        // console.log('Verify token-->',verifyToken) --> Token verificado

        //Nos traemos al usuario de la db para ello, tenemos que requerir el modelo del usuario y buscamos por id introducido en el token verificado(que pertenece a cada usuario)
        const locateUser = await User.findById(verifyToken.id);
        //Igualamos la contraseña a null aunque este hasheada par no mostrarla.
        locateUser.password = null;
        //Añadimos en la petición el usuario encontrado, inyectando una nueva propiedad en la petición
        req.user = locateUser;
        // console.log('User-->',locateUser)-->Muestra el usuario que esta accediendo a nuestra ruta securizada

        //Lamamos a la funcion next para que funcione el middleware y funcione la securización de las rutas
        next();
    } catch (err) {
        err.message = 'Authorization is not possible';
        return next(`Error: ${err}.`);
    }
}


//Exportamos nuestras funciones
module.exports = {
    isAuth
}