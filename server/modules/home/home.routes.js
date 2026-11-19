import express from 'express';
//importando la accion que quiero enrutar
import renderHome from './home.controller.js';

//creando un enrutador de esprexx
const homeRouter = express.Router();

//enrutando action methods del controlador home

//reponde aun get de la raiz
homeRouter.get('/', renderHome);

export default homeRouter;