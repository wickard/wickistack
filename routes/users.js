var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', function(req, res, next){
  res.send('info for user ' + req.params.id)
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
