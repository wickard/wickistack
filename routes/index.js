var express = require('express');
var router = express.Router();
const wikiRouter = require('./wiki')
const usersRouter = require('./users')
var models = require("../models");
var Page = models.Page;
/* GET home page. */
router.get('/', function(req, res, next) {
  const page = Page.findAll({
    attributes: ['title', 'urlTitle']
  }).then((pages) => {
    res.render('index', { pages: pages })
  })
});

router.use('/wiki', wikiRouter)
router.use('/users', usersRouter)
module.exports = router;
