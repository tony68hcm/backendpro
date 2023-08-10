'use strict'

const keytokenModel = require("../models/keytoken.model")

class KeyTokenService{
    static createToken = async ({userId, publicKey, privateKey}) => {
        try {
            const publicKeyString = publicKey

            const token = await keytokenModel.create({
                userId: userId,
                publicKey: publicKeyString,
                privateKey: privateKey
            })

            return token ? token.publicKey : null
        } catch (error) {
            console.log('error token tạo ra table ', error)

            return error
        }
    }
}

module.exports = KeyTokenService