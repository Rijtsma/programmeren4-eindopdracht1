
let express = require('express')
let routes = express.Router()
let studentenhuiscontroller = require('../controllers/studentenhuis.controller')
//const { validate } = require('../domain/Studentenhuis');

// hier schrijven we router endpoints
routes.get('/studentenhuis', studentenhuiscontroller.getAllStudentenhuizen)
routes.post('/studentenhuis', studentenhuiscontroller.createStudentenhuis)

routes.get('/studentenhuis/:id', studentenhuiscontroller.getStudentenhuisById)
routes.put('/studentenhuis/:id', studentenhuiscontroller.updateStudentenhuisById)
routes.delete('/studentenhuis/:id', studentenhuiscontroller.deleteStudentenhuisById)

module.exports = routes
