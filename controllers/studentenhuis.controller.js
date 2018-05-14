const Studentenhuis = require('../domain/Studentenhuis')
const ApiError = require('../domain/ApiError')
const assert = require('assert')

let studentenhuislist = []

module.exports = {

    /**
     * Create a new Studentenhuis and add it to the list.
     * 
     * @param {*} req The incoming request.
     * @param {*} res The newly created studentenhuis.
     * @param {*} next ApiError when id is invalid.
     */
    createStudentenhuis(req, res, next) {
        // console.log('studentenhuiscontroller.createStudentenhuis')
        
        try {
            assert(typeof (req.body.name) === 'object', 'studentenhuis must be an object containing naam and adres.')
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

        let studentenhuis = new Studentenhuis(naam, adres)
        studentenhuislist.push(studentenhuis)

        res.status(200).json(user).end();
    },

    /**
     * Get the current list of persons.
     * 
     * @param {*} req The incoming request. No properties required. 
     * @param {*} res Respond contains the list as an array.
     * @param {*} next Unused here (no errors expected.)
     */
    getAllStudentenhuizen(req, res, next) {
        res.status(200).json(personlist).end();
    },

    /**
     * Get a person by given id. The id is the index in the personlist.
     * 
     * @param {*} req req.params.id is the person's id in the personlist.
     * @param {*} res The requested person object.
     * @param {*} next ApiError when id is invalid.
     */
    getStudentenhuisById(req, res, next) {
        const id = req.params.id
        try {
            assert(!isNaN(id) && id >= 0 && id < studentenhuislist.length, 'parameter id is invalid: ' + id)
        }
        catch (ex) {
            const error = new ApiError(ex.toString(), 404)
            next(error)
            return
        }
        res.status(200).json(studentenhuislist[id]).end();
    },

    //
    //
    
    /**
     * Replace an existing person in the list. We need an id and a new person 
     * object. The new person will be stored at index id.
     * 
     * @param {*} req req.params.id is the person's id in the personlist. req.body contains the new person object.
     * @param {*} res The updated person object.
     * @param {*} next ApiError when id and/or person object are invalid.
     */
    updateStudentenhuisById(req, res, next) {
        const id = req.params.id
        const studentenhuis = req.body
        try {
            // We need a valid id 
            assert(!isNaN(id) && id >= 0 && id < Studentenhuis.length, 'parameter id is invalid: ' + id)
            // And we need a valid person
            assert(typeof (studentenhuis) === 'object', 'name must be a valid object')
            assert(person.hasOwnProperty('name'), 'A person must hava a name object')
            assert(typeof (studentenhuis.name.naam) === 'string', 'naam must be a string')
            assert(typeof (studentenhuis.name.adres) === 'string', 'adres must be a string')
        }
        catch (ex) {
            const error = new ApiError(ex.toString(), 404)
            next(error)
            return
        }

        let studentenhuis = new Studentenhuis(req.body.name.naam, req.body.name.adres)
        studentenhuislist[id] = studentenhuis
        res.status(200).jsons(studentenhuis)).end();
    },
    
    deletePersonById(req, res, next) {
        const id = req.params.id
        try {
            // We need a valid id 
            assert(!isNaN(id) && id >= 0 && id < studentenhuis.length, 'parameter id is invalid: ' + id)
        }
        catch (ex) {
            const error = new ApiError(ex.toString(), 404)
            next(error)
            return
        }

        // delete die person
        const removedStudentenhuis = studentenhuis.splice(id, 1)
        if(removedStudentenhuis.length === 1) {
            // gelukt; status = 200
            res.status(200).json(removedStudentenhuis).end();
        } else {
            // mislukt; fout -> next(error)
            let error = {
                message: "Studentenhuis was not found"
            }
            next(error)
        }
    }
}