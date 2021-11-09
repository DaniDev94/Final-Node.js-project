const UserRoutes = require('express').Router();
const { isAuth } = require('../middleware/auth');

const { getAllUsers, getUserById,
    postNewUser, loginUser, logoutUser, putUser, patchUser, deleteUser } = require('../controllers/user.controller');

UserRoutes.get('/', getAllUsers);
UserRoutes.get('/:id', getUserById);
UserRoutes.post('/', postNewUser);
//Ruta para crear el login de cada usuario
UserRoutes.post('/login', loginUser);
//Ruta para crear el logout de cada usuario y securizarla
UserRoutes.post('/logout',[isAuth], logoutUser);
UserRoutes.put('/:id', putUser);
UserRoutes.patch('/:id', patchUser);
UserRoutes.delete('/:id', deleteUser);



module.exports = UserRoutes;