const express =  require('express');

//Controllers
const IncidentController = require('./controllers/IncidentController');
const OngController = require('./controllers/OngController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//Login
routes.post('/sessions', SessionController.create);

//Rotas para as Ongs
routes.get('/ongs', OngController.list);
routes.post('/ongs', OngController.create);

routes.get('/Profile/incidents', ProfileController.list);
//Rotas para os Casos  - Incidents
routes.get('/incidents', IncidentController.list);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/delete/:id', IncidentController.delete);

module.exports = routes;