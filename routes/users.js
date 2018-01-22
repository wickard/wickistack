var express = require('express');
var router = express.Router();
var models = require("../models");
var User = models.User;
var Page = models.Page;
/* GET users listing. */
router.get('/', function(req, res, next) {
  User.findAll({
    attributes: ['name', 'id']
  })
  .then((data) => {
    res.render('users', {users: data});
  })
  .catch(console.log)
});

router.get('/:id', function(req, res, next){
  const userProm = User.findOne({where: {id: req.params.id}})
  const pageProm = Page.findAll({where: {authorId: req.params.id}})
  Promise.all([userProm, pageProm]).then((data) =>{
    res.render('singleUser', {user: data[0], pages: data[1]})
  })
})

router.post('/', function(req, res, next){
  res.send('posted a user, not really')
})

router.put('/:id', function(req, res, next){
  res.send('updating user ' + req.params.id)
})

router.delete('/:id', function(req, res, next){
  res.send('deleting user ' + req.params.id)
})
module.exports = router;
