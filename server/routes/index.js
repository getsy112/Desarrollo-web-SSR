import express from 'express'

const router = express.Router();

let Counter = 0;
const numbers= []
/* GET home page. */
router.get('/', (req, res, _next) => {
  Counter += 1;
  numbers.push(Counter);
  res.render('index', { title: 'Sanchez Martinez Eber', Counter, numbers });
});

//module.exports = router;
export default router;