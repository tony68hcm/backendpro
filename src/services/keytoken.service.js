'use strict'

const keytokenModel = require("../models/keytoken.model")

class KeyTokenService{
    static createToken = async ({userId, publicKey}) => {
        try {
            const publicKeyString = publicKey
            console.log('bat dau insert vo collection key ')

            const token = await keytokenModel.create({
                userId: userId,
                publicKey: publicKeyString
            })

            console.log('token tạo ra table ', token)
            return token ? publicKeyString : null
        } catch (error) {
            console.log('error token tạo ra table ', error)

            return error
        }
    }
}

module.exports = KeyTokenService