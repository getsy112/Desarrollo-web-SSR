import express from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, _next) => {
res.send('<h1 style="color:blue;">LISTA DE USUARIOS</h1>');
});

//module.export  = router
export default router;
