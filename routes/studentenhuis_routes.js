let express = require('express')
let routes = express.Router()
let studentenhuiscontroller = require('../controllers/studentenhuis.controller')
const auth = require('../logon/tokenLogin')
const database = require('../studentenhuis');
const { validate } = require('../domain/Studentenhuis');

// hier schrijven we router endpoints
routes.get('/studentenhuis', studentenhuiscontroller.getAllStudentenhuizen)
routes.post('/studentenhuis', studentenhuiscontroller.createStudentenhuis)

//routes.get('/persons/:id', personcontroller.getPersonById)
//routes.put('/persons/:id', personcontroller.updatePersonById)
//routes.delete('/persons/:id', personcontroller.deletePersonById)

module.exports = routes