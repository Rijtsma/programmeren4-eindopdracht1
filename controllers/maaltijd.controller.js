const Maaltijd = require('../domain/Maaltijd')
const ApiError = require('../domain/ApiError')
const assert = require('assert')

let maaltijdlist = []

module.exports = {

    /**
     * Create a new Maaltijd and add it to the list.
     * 
     * @param {*} req The incoming request.
     * @param {*} res The newly created maaltijd.
     * @param {*} next ApiError when id is invalid.
     */
    createMaaltijd(req, res, next) {
        // console.log('Maaltijdcontroller.createMaaltijd')
        
        try {
            assert(typeof (req.body.name) === 'object', 'Maaltijd must be an object containing naam and adres.')
            assert(typeof (req.body.name.naam) === 'string', 'naam must be a string.')
            assert(typeof (req.body.name.adres) === 'string', 'adres must be a string.')
        }
        catch(ex) {
            const error = new ApiError(ex.toString(), 422)
            next(error)
            return
        }

        const naam = req.body.name.naam
        const adres = req.body.name.adres

        let maaltijd = new Maaltijd(naam, adres)
        maaltijdlist.push(maaltijd)

        res.status(200).json(user).end();
    },

    /**
     * Get the current list of maaltijden.
     * 
     * @param {*} req The incoming request. No properties required. 
     * @param {*} res Respond contains the list as an array.
     * @param {*} next Unused here (no errors expected.)
     */
    getAllMaaltijden(req, res, next) {
        res.status(200).json(maaltijdlist).end();
    },

    /**
     * Get a maaltijd by given id. The id is the index in the maaltijdlist.
     * 
     * @param {*} req req.params.id is the maaltijd's id in the maaltijdlist.
     * @param {*} res The requested maaltijd object.
     * @param {*} next ApiError when id is invalid.
     */
    getMaaltijdById(req, res, next) {
        const id = req.params.id
        try {
            assert(!isNaN(id) && id >= 0 && id < maaltijdlist.length, 'parameter id is invalid: ' + id)
        }
        catch (ex) {
            const error = new ApiError(ex.toString(), 404)
            next(error)
            return
        }
        res.status(200).json(maaltijdlist[id]).end();
    },

    //
    //
    
    /**
     * Replace an existing maaltijd in the list. We need an id and a new maaltijd 
     * object. The new maaltijd will be stored at index id.
     * 
     * @param {*} req req.params.id is the maaltijd's id in the maaltijdlist. req.body contains the new maaltijd object.
     * @param {*} res The updated maaltijd object.
     * @param {*} next ApiError when id and/or maaltijd object are invalid.
     */
    updateMaaltijdById(req, res, next) {
        const id = req.params.id
        const maaltijd = req.body
        try {
            // We need a valid id 
            assert(!isNaN(id) && id >= 0 && id < Maaltijd.length, 'parameter id is invalid: ' + id)
            // And we need a valid maaltijd
            assert(typeof (maaltijd) === 'object', 'name must be a valid object')
            assert(maaltijd.hasOwnProperty('name'), 'A maaltijd must hava a name object')
            assert(typeof (maaltijd.name.naam) === 'string', 'naam must be a string')
            assert(typeof (maaltijd.name.adres) === 'string', 'adres must be a string')
        }
        catch (ex) {
            const error = new ApiError(ex.toString(), 404)
            next(error)
            return
        }

        let maaltijd = new Maaltijd(req.body.name.naam, req.body.name.adres)
        maaltijdlist[id] = maaltijd
        res.status(200).jsons(maaltijd).end();
    },
    
    deleteMaaltijdById(req, res, next) {
        const id = req.params.id
        try {
            // We need a valid id 
            assert(!isNaN(id) && id >= 0 && id < maaltijd.length, 'parameter id is invalid: ' + id)
        }
        catch (ex) {
            const error = new ApiError(ex.toString(), 404)
            next(error)
            return
        }

        // delete die maaltijd
        const removedMaaltijd = maaltijd.splice(id, 1)
        if(removedMaaltijd.length === 1) {
            // gelukt; status = 200
            res.status(200).json(removedMaaltijd).end();
        } else {
            // mislukt; fout -> next(error)
            let error = {
                message: "Maaltijd was not found"
            }
            next(error)
        }
    }
}