var express = require("express");
var router = express.Router();
var models = require("../models");
var Page = models.Page;
var User = models.User;

router.get("/", function(req, res, next) {
  res.redirect("/");
});

router.post("/", function(req, res, next) {
  User.findOrCreate({where: {name: req.body.author, email: req.body.email}})
  .then((userData) => {
    const user = userData[0]
    var page = Page.build({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status
    });
    return page.save().then((page) => {
      return page.setAuthor(user)
    })
  })
  .then((page) => {
    res.redirect(page.route)
  })
  .catch(console.log)
});

router.get("/add", function(req, res, next) {
  res.render("addpage");
});

////broken///////
router.get("/:urlTitle", function(req, res, next) {
  Page.findOne({where: {urlTitle: req.params.urlTitle}})
  .then((data) => {
    return [User.findOne({where: { id: data.authorId}}), data]
  }).then((data) => {
    console.log('data: ' + data)
    res.render('wikipage', {page: data[0], users: data[1]})
  })
});

module.exports = router;
