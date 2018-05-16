const Studentenhuis = require('../domain/Studentenhuis')
const ApiError = require('../domain/ApiError')
const assert = require('assert')
const database = require('../config/connectDB')
const auth =  require('../logon/tokenLogin');

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
        const name = req.body.name
        const adress = req.body.adress
        const xToken = req.header('x-access-token') || ''
        const decryptToken = jwt.decode(xToken, config.secretKey)


        database.query('SELECT ID FROM user WHERE email =' + decryptToken.sub.toString(), function (error, result, fields) {
            if (error) {
                next(error)
            } else {
                db.query('INSERT INTO studentenhuis (Naam,Adres,ID) VALUES ("' + name + '","' + adress + '","' + result[0].id + '")', function(error, rows, fields){ 
                if (error) {
                    next(error)
                } else {
                    res.status(200).json({
                        status: {
                            ID: result[0].id,
                            naam: name,
                            adres: adress,
                            contact: 'Zie e-mailadres',
                            email: decryptToken.sub
                        },
                        result: rows
                    }).end()
                }
            })
        }
    })
}catch(err){
    throw(new ApiError(err.toString(),412))
}
},

    /**
     * Get a studentenhuis by given id. The id is the index in the studentenhuislist.
     * 
     * @param {*} req req.params.id is the studentenhuis's id in the studentenhuislist.
     * @param {*} res The requested studentenhuis object.
     * @param {*} next ApiError when id is invalid.
     */

    getStudentenhuisById(req, res, next) {

        database.query('SELECT * FROM studentenhuis WHERE ID=' + req.params.id, function (error, rows, fields) {
            if (error) {
                next(error)
            } else {
                res.status(200).json({
                    status: {
                        query: 'ok'
                    },
                    result: rows
                }).end()
            }
        })
    },

    //
    //
    
    /**
     * Replace an existing studentenhuis in the list. We need an id and a new studentenhuis 
     * object. The new studentenhuis will be stored at index id.
     * 
     * @param {*} req req.params.id is the studentenhuis's id in the studentenhuislist. req.body contains the new studentenhuis object.
     * @param {*} res The updated studentenhuis object.
     * @param {*} next ApiError when id and/or studentenhuis object are invalid.
     */
    updateStudentenhuisById(req, res, next) {
        database.query('UPDATE studentenhuis SET Naam = ?, Adres = ? WHERE ID = ?', [naam, adres, id], function (error, rows, fields) {
            if (error) {
                next(error)
            } else {
                res.status(200).json({
                    status: {
                        query: 'ok'
                    },
                    result: rows
                }).end()
            }
        })
    },
    
    deleteStudentenhuisById(req, res, next) {
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

        // delete die studentenhuis
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