var express = require('express');
var router = express.Router();
const apiRouter=require('./api/index')
var usersRouter = require('./users');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use("/api",apiRouter);
router.use('/users', usersRouter);

module.exports = router;
