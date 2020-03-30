const express =  require('express');
const { celebrate, Segments, Joi } =  require('celebrate');

//Controllers
const IncidentController = require('./controllers/IncidentController');
const OngController = require('./controllers/OngController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//Login
routes.post('/sessions', celebrate({
    [ Segments.BODY ]: Joi.object().keys({
        id: Joi.string().required(),
    }),
}), SessionController.create);

//Rotas para as Ongs
routes.get('/ongs', OngController.list);
routes.post('/ongs', celebrate({
    [ Segments.BODY ]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().length(14),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

routes.get('/profile', celebrate({
    [ Segments.HEADERS ]: Joi.object({
       authorization: Joi.string().required(), 
    }).unknown()
}), ProfileController.list);
//Rotas para os Casos  - Incidents
routes.get('/incidents', celebrate({
    [ Segments.QUERY ]: Joi.object({
        page: Joi.number(),
    }).unknown()
}), IncidentController.list);

routes.post('/incidents', celebrate({
    [ Segments.HEADERS ]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [ Segments.BODY ]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    }),
}), IncidentController.create);

routes.delete('/incidents/delete/:id', celebrate({
    [ Segments.PARAMS ]: Joi.object().keys({
       id: Joi.number().required(), 
    })
}), IncidentController.delete);

module.exports = routes;