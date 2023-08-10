'use strict'
const JWT = require('jsonwebtoken')
const createTokenPair = async (payload, privateKey, publicKey) => {
    try {
        const accessToken = JWT.sign(payload, publicKey, {
            expiresIn: '2 days'
        })

        const refreshToken = JWT.sign(payload, privateKey, {
            expiresIn: '7 days'
        })

        JWT.verify(accessToken, publicKey, (err, decode) => {
            if(err){
                console.log('verify accesstoken error', err)
            }else {
                console.log('success decode accessToken', decode)
            }
        })

        return {accessToken, refreshToken}
    } catch (error) {
        console.log('error createTokenPair ', error)
    }
}

module.exports = {
    createTokenPair
}