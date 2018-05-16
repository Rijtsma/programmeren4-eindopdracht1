const express = require('express')
const routes = express.Router()
const maaltijdcontroller = require('../controllers/maaltijd.controller')

// hier schrijven we router endpoints
routes.get('/studentenhuis/:id/maaltijd', maaltijdcontroller.getAllMaaltijden)
routes.post('/studentenhuis/:id/maaltijd', maaltijdcontroller.createMaaltijd)
routes.get('/studentenhuis/:id/maaltijd/:id2', maaltijdcontroller.getMaaltijdById)
routes.put('/studentenhuis/:id/maaltijd/:id2', maaltijdcontroller.updateMaaltijdById)
routes.delete('/studentenhuis/:id/maaltijd/:id2', maaltijdcontroller.deleteMaaltijdById)

module.exports = routes