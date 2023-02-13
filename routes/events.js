const { getEvents, createEvent, updateEvent, deleteEvent } = require("../contollers/events");
const { validateJWT } = require("../middlewares/validate-jwt");
const { check } = require('express-validator')
const { Router }= require('express');
const { validateFields } = require("../middlewares/validateFields");
const { isDate } = require("../helpers/isDate");
const router = Router();

//Todas deben de pasar por la validación del JWT
 router.use( validateJWT );



// Obtener eventos
router.get('/', getEvents);

//Crear evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        validateFields,
    ],
    createEvent
);


//Actualizar evento
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        validateFields,
    ],
     updateEvent);

//Borrarevento
router.delete('/:id', deleteEvent);

module.exports = router;