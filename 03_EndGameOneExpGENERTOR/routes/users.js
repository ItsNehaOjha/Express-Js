const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/practicekaro");

//schema(template): banne wale document me sabse choti entity kya hogi

const userSchema = mongoose.Schema({
  username:String,
  name:String,
  age:Number
})

//model
module.exports = mongoose.model("user",userSchema);