const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const loginController = require('./controllers/login.controller')
const loginRegister = require('./routes/public_routes');
const studenthouse = require('./routes/studenthouse');
const maaltijd = require('./routes/maaltijd');

let app = express()

const port = process.env.PORT || 3000

// bodyParser parses the body from a request
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json())

// Instal Morgan as logger
app.use(morgan('dev'))

// Demo - preprocessing catch-all endpoint continue to next.
app.use('*', function(req, res, next){
	next()
})

app.use('/api', public_routes)

app.all('*', loginController.validateToken) //login om verder te gaan

// Regular endpoints
app.use('/api', maaltijd_routes)
app.use('/api', studentenhuis_routes)


//geen endpoint matcht!
app.use('*', function (req, res, next) {
	res.status(404) 
		.json({
			message: 'Geen enkele endpoint matcht!'
		})
		.end();
});

// Error handler, handelt alle foutsituaties af waarbij error !== null
app.use(function (error, req, res, next) {
	console.error(error.toString());
	res.status(500).json({
		message: error
	}).end();
});


app.listen(port, () => {
	console.log('Server running on port ' + port)
})

module.exports = app
