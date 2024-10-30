var express = require('express');
var router = express.Router();
const userModel = require("./users")

router.get('/', function(req, res, next) {
  res.render('index');
});

//create update delete read(CRUD)

router.get("/create", async function(req,res){
  const createdUser = await userModel.create({
    username: "Neha",
    age:23,
    name:"Neha Ojha"
  });
  res.send(createdUser);
});

module.exports = router;
