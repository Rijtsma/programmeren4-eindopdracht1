const express = require('express')
const routes = express.Router()
const maaltijdcontroller = require('../controllers/maaltijd.controller')

// hier schrijven we router endpoints
routes.get('/studentenhuis/StudentenhuisID/maaltijd', maaltijdcontroller.getAllMaaltijden)
routes.post('/studentenhuis/StudentenhuisID/maaltijd', maaltijdcontroller.createMaaltijd)
//routes.get('/studentenhuis/StudentenhuisID/maaltijd/:id', personcontroller.getMaaltijdById)
//routes.put('/studentenhuis/StudentenhuisID/maaltijd/:id', personcontroller.updateMaaltijdById)
//routes.delete('/studentenhuis/StudentenhuisID/maaltijd/:id', personcontroller.deleteMaaltijdById)

module.exports = routes