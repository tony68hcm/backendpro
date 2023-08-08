'use strict'

const AccessService = require("../services/access.service")

class AccessController{
    signup = async (req, res, next) => {
        try {
            console.log(`[p]::signup::`, req.body)
            
            return res.status(200).json(AccessService.signup(req.body))
        } catch (error) {
            console.log(`error ${error}`)
            next(error)
        }
    }
}

module.exports = new AccessController()