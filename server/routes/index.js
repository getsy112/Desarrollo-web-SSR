import express from 'express'
var router = express.Router();

let Counter = 0;
const numbers= []
/* GET home page. */
router.get('/', function(req, res, _next) {
  Counter ++;
  numbers.push(Counter);
  res.render('index', { title: 'Sanchez Martinez Eber', Counter, numbers });
});

//module.exports = router;
export default router;