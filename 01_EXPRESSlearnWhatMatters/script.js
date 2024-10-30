const express = require('express')
const app = express()

//static files
app.use(express.static('./public'))

//middleware
app.use(function(req, res, next){
  console.log("hi")
  next();
})


app.get('/', function (req, res) {
  res.send('Hello World')
})

//routes parameter
app.get('/Profile/:username', function (req, res) {
  res.send(`<h1>Helloo from ${req.params.username} </h1>   <h2><br/> this is now dynamic </h2> change name as you want `)
})

//template engines 

// ejs is html used as template engine to use html not like the previous I did by h1 h2 tags 

// to add a proper html files in backend file we use ejs for html to make things dynamic 

// steps to setup in readme file 

//configure ejs
app.set("view engine", "ejs");


app.get('/Contact', function (req, res) {
  res.render('index')
})
app.get('/error', function (req, res,next) {
  throw Error("something went wrong");
})

//error handling 

app.use(function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
})

app.listen(3000)