var express = require('express');
var router = express.Router();
const wikiRouter = require('./wiki')
const usersRouter = require('./users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/wiki', wikiRouter)
router.use('/users', usersRouter)
module.exports = router;
