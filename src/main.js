//Requerimos express
const express = require('express');

//Importamos los archivos que alojas nuestras rutas
const FruitRoutes = require('./routes/fruit.routes');
const StoreRoutes = require('./routes/store.routes');
const UserRoutes = require('./routes/user.routes');

//Importamos la función que contine la conexión a la db
const { connectWhithDb } = require('./utils/db/db');
//Importamos el middleware para securizar las rutas
const { isAuth } = require('./middleware/auth');

//Declaramos el puerto
const PORT = 3000;

//Almacenamos la funcionalidad de express en una variable
const app = express();

//Invocamos la función que aloja nuestra conexión a la db para conectarla con el puerto
connectWhithDb();

//Express nos proporciona este middleware para manejar los datos y poder leer, crear, editar o eliminar(CRUD)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Declarmos las rutas principales. 1ºParam: nombre de la ruta. 2ºParam: Archivo importado de la carpeta routes que corresponda con la ruta.
//La ruta user va siempre arriba
app.use('/users', UserRoutes);
//Securizamos las rutas
app.use('/fruits',[isAuth], FruitRoutes);
app.use('/stores',[isAuth], StoreRoutes);

//Declaramos una ruta con '*' para cuando no exista la ruta introducida
app.use('*', (req, res) =>{
    res.status(404).json('Patch not found');
});

//Middleware de errores. Se coloca al final, encima de app.listen. Con ello ya podriamos hacer uso de la función next() en nuestras rutas, personalizando los mensajes
app.use((req, res, next) => {
    let err = new Error();
    err.status = 404;
    err.message = 'Unexpected error';
    next(err);
    });

//El servidor necesita dos argumentos, el puerto y un callback.Con ello nos permite levantar el servidor para que este a la "escucha". Siempre debe ir abajo
app.listen(PORT, ()=>{
    console.log(`Server ready in http://localhost:${PORT}`);
})



