var express = require('express');
var router = express.Router();
const usermodel = require("./users");

router.get('/', function(req, res) {
  res.render('index');
});

// router.get("/create",async function(req,res){
//   let userdata = await usermodel.create({
//     username: "Sneha",
//     nickname: "USsssssssssssssssssssssssssssssssssssssssss",
//     description: "best friendsssssss ",
//     categories:[ 'love','life','everything'],
    
//   });
//   res.send(userdata);
// })
//find on the basis of case insensitive and only specific word not other than that : ^ = starting and $= end
// router.get("/getUser",async function(req,res){
//   var regex = new RegExp("^Neha$","i");
//   let user = await usermodel.find({username: regex})
//   res.send(user);
// })

//find on the basis of specific category like love 

// router.get("/getUser",async function(req,res){
//   let user = await usermodel.find({categories: {$all:['love','everything']}})
//   res.send(user);
// })

//how can I search for documents with a specific date range in Mongoose?
// router.get("/getUser",async function(req,res){
//   // var date1 = new Date('yyyy-mmm-dd')
//   var date1 = new Date('2024-10-30');
//   var date2 = new Date('2024-10-31');
//   // gte = greater that equal to 
//   let user = await usermodel.find({datecreated: {$gte: date1, $lte: date2}})
//   res.send(user);
// })


// How can I filter documents based on the existance of a fiels in Mongoose?

// router.get("/getUser",async function(req,res){
  
//   let user = await usermodel.find({categories: {$exists:true}});
//   res.send(user);
// })

// gow can I filter document based on a specific field's length ?
router.get("/getUser",async function(req,res){
  
  let user = await usermodel.find({
    $expr:{          //expression
      $and:[           
        {$gte: [{$strLenCP: '$nickname'},12] },   //strLenCP=string length compare
        {$lte: [{$strLenCP: '$nickname'},122] }
      ]
    }
  });
  res.send(user);
})


module.exports = router;
