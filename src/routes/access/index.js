'use strict'

const express = require(`express`)
const accessController = require("../../controllers/access.controller")
const { asyncHandler } = require("../../core/error.handler")
const router = express.Router()

router.post('/shop/signup', asyncHandler(accessController.signup))
module.exports = router