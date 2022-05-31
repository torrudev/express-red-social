const { Router } = require('express');
const router = Router();

const { isLoggedIn, isNotLoggedIn, isCurrentUser } = require('../lib/auth');
const {
  loginView,
  login,
  registerView,
  register,
  logout,
  profileView,
  profileEditView,
  profileEdit,
  profileDeleteView,
  profileDelete
} = require('../controllers/userController');

// autenticacion
router.get('/login', isNotLoggedIn, loginView);
router.post('/login', isNotLoggedIn, login);
router.get('/registro', isNotLoggedIn, registerView);
router.post('/registro', isNotLoggedIn, register);
router.get('/salir', isLoggedIn, logout);

// perfiles
router.get('/usuario/:id', isLoggedIn, profileView);
router.get('/usuario/:id/editar', isCurrentUser, profileEditView);
router.post('/usuario/:id/editar', isCurrentUser, profileEdit);
router.get('/usuario/:id/eliminar', isCurrentUser, profileDeleteView);
router.post('/usuario/:id/eliminar', isCurrentUser, profileDelete);

module.exports = router;
