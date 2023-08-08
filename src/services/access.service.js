'use strict'
const KeyTokenService = require('./keytoken.service')
const { createTokenPair } = require('../auth/authUtils')

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
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
                      type: 'spki',
                      format: 'pem',
                    },
                    privateKeyEncoding: {
                      type: 'pkcs8',
                      format: 'pem',
                      cipher: 'aes-256-cbc',
                      passphrase: 'top secret',
                    },
                  })
                  
                  */

                  //test 
                  const publicKey = '123434'
                  const privateKey = '2342342'
               // console.log({privateKey, publicKey})
                console.log('public key', publicKey)

                var ObjectId = mongoose.Types.ObjectId
                const shopId = new ObjectId(newShop._id)
                console.log('userId ', shopId)

                const publicKeyString = KeyTokenService.createToken({
                    userId: shopId,
                    publicKey
                })

                if(publicKeyString){
                    console.log('tạo public key success: ', publicKeyString)
                }

                if(!publicKeyString){
                    return {
                        code: 'xxxx',
                        message: 'public key string error'
                    }
                }

                const tokens = createTokenPair({userId: newShop._id, email}, privateKey, publicKeyString)
                console.log('tạo token success: ', tokens)

                return {
                    code: 201,
                    metadata: {
                        shop: newShop,
                        tokens
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