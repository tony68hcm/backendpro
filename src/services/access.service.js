'use strict'
const KeyTokenService = require('./keytoken.service')
const { createTokenPair } = require('../auth/authUtils')

const shopModel = require("../models/shop.model")
const {getInfoData} = require('../utils/index')
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')
const { Schema, Mongoose, mongo, default: mongoose } = require('mongoose')

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService{
    static signup = async ({name, email, password}) => {
        try {
            //check if email exist
            const holderShop = await shopModel.findOne({email}).lean()
            
            if(holderShop){
                return {
                    code: 'xxxx',
                    message: 'shop đã tồn tại'
                }
            }

            const passwordHash = await bcrypt.hash(password, 10)

            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles: [RoleShop.SHOP]
            })
              
            if(newShop){

                //tạo private key verify token, publick key//sign token
                /*
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                      type: 'pkcs1',
                      format: 'pem',
                    },
                    privateKeyEncoding: {
                      type: 'pkcs1',
                      format: 'pem'
                    },
                  })

                  */

                const privateKey = crypto.randomBytes(64).toString('hex')
                const publicKey = crypto.randomBytes(64).toString('hex')  
            
                console.log({privateKey, publicKey})
                
                var ObjectId = mongoose.Types.ObjectId
                const shopId = new ObjectId(newShop._id)
                console.log('userId ', shopId)

                const publicKeyString = await KeyTokenService.createToken({
                    userId: shopId,
                    publicKey,
                    privateKey
                })

                if(!publicKeyString){
                    return {
                        code: 'xxxx',
                        message: 'public key string error'
                    }
                }

                console.log('::publickeystring::', publicKeyString)
                //const publicKeyObject = crypto.createPublicKey(publicKey)

                const tokens = createTokenPair({userId: newShop._id, email}, privateKey, publicKey)
                console.log('tạo token success: ', tokens)

                return {
                    code: 201,
                    metadata: {
                        shop: getInfoData({fields: ['_id', "name", "email"], object: newShop}),
                        tokens: await tokens
                    }
                }
            }

            return {
                code: 200,
                metadata: null
            }
        } catch (error) {
            console.log('loi ne', error)
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService