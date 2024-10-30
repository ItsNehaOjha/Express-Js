var express = require('express');
var router = express.Router();
const userModel = require("./users")

router.get('/', function(req, res, next) {
  req.session.koibhinaam ="hello";
  res.render('index');
});
//can check the session in any other route: 
router.get('/checkSession', function(req,res){
  console.log(req.session);
  res.send("Check kiya h console dekho");
})

//create update delete read(CRUD) : 
//create :

//NOTE: agar ye function likha rha to jitni bar me server bnaungi nya same user bnta jayega 
router.get("/create", async function(req,res){
  const createdUser = await userModel.create({
    username: "Neha",
    age:23,
    name:"Neha Ojha"
  });
  res.send(createdUser);
});


// read user

router.get("/allusers",async function(req,res){
  let allUsers= await userModel.find();  //.find = sare bande nikal k bhejta h
  res.send(allUsers);   //these data is in a array
})

//.findOne method to read one banda

// router.get("/allusers",async function(req,res){
//   let allUsers= await userModel.findOne({username:"Neha"});  
//   res.send(allUsers);   
// })


//delete user

router.get("/delete",async function(req,res){
    let deletedUser = await userModel.findOneAndDelete({
      username:"Neha"
    })
    res.send(deletedUser);
})
module.exports = router;
