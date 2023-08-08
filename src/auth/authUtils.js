'use strict'
const JWT = require('jsonwebtoken')
const createTokenPair = async (payload, privateKey, publicKey) => {
    try {
        const accessToken = JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days'
        })

        const refreshToken = JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days'
        })

        JWT.verify(accessToken, publicKey, (err, decode) => {
            if(err){
                console.log('verify accesstoken err', err)
            }else {
                console.log('success decode ', decode)
            }
        })

        return {accessToken, refreshToken}
    } catch (error) {
        
    }
}

module.exports = {
    createTokenPair
}