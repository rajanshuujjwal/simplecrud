//Middlewares
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended : true}))

//Initialize Server only if Database is connected!
var db

MongoClient.connect('mongodb://localhost:27017/quotes', (err, database) =>{
	if (err) return console.log(err)
	db = database
	app.listen(3000, () => {
 		console.log('Connected to DB and Server is listening on port 3000')
 	})
})

//Setting View Engine
app.set('view engine', 'ejs')


//Handlers 
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray(function(err, results) {
  if (err)  return console.log(err)
  	//render index.ejs file
  res.render('index.ejs', {quotes : results})
  })
})

app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body), (err, result) => {
		if (err) return console.log(err)

		console.log('saved to Database')
		res.redirect('/')
	}
 console.log(req.body)
})
