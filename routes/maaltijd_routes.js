const express = require('express')
const routes = express.Router()
const maaltijdcontroller = require('../controllers/maaltijd.controller')
const auth = require('../logon/tokenLogin')
const database = require('../studentenhuis');
const { validate } = require('../domain/Maaltijd');

// hier schrijven we router endpoints
routes.get('/maaltijd', maaltijdcontroller.getAllStudentenhuizen)
routes.post('/maaltijd', maaltijdcontroller.createMaaltijd)

//routes.get('/persons/:id', personcontroller.getPersonById)
//routes.put('/persons/:id', personcontroller.updatePersonById)
//routes.delete('/persons/:id', personcontroller.deletePersonById)

module.exports = routes