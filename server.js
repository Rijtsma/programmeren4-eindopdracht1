var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')
const morgan = require('morgan')

let app = express()

const port = process.env.PORT || 3000

// bodyParser parses the body from a request
app.use(bodyParser.json())

// Instal Morgan as logger
app.use(morgan('dev'))

// Demo - preprocessing catch-all endpoint continue to next.
app.use('*', function(req, res, next){
	next()
})

// Regular endpoints
app.use('/api', person_routes)

app.listen(port, () => {
	console.log('Server running on port ' + port)
})

module.exports = app