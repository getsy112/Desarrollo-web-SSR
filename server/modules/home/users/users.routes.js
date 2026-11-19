import express from 'express';
import getUsers from './users.controller.js';
//creando un enrutador de esprexx
const userRouter = express.Router();

//enrutando users
userRouter.get('/', getUsers);

export default userRouter;
