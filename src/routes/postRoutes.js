const { Router } = require('express');
const router = Router();

const { isLoggedIn, isNotLoggedIn, isCurrentUser } = require('../lib/auth');
const {
  postCreate,
  postView,
  postCreateChild,
  postEditView,
  postEdit,
  postDelete
} = require('../controllers/postController');

// publicaciones
router.post('/post/crear', isLoggedIn, postCreate);
router.post('/post/:parent_id/crear', isLoggedIn, postCreateChild);
router.get('/post/:id', isLoggedIn, postView);
router.get('/post/:id/editar', isLoggedIn, postEditView);
router.post('/post/:id/editar', isLoggedIn, postEdit);
router.get('/post/:id/borrar', isLoggedIn, postDelete);

module.exports = router;
