/* 
    Rutas de usuarios / Auth
    host + /api/auth
 */

const { Router }= require('express');
const { createUser, loginUser, revalidateToken } = require('../contollers/auth');
const router = Router();
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validate-jwt');

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener 6 caracteres minimo').isLength({ min: 6 }),
        validateFields
    ], 
    createUser);

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener 6 caracteres minimo').isLength({ min: 6 }),
        validateFields
    ], 
    loginUser);
    
router.get('/renew', validateJWT, revalidateToken);

module.exports = router;

//lkH4s6WEWbkFqtJX
