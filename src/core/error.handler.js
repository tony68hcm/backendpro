'use strict'
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const initErrorHandler = async (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404

  next(error)
}

/**
 *
 * @param {*} error
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const errorHandler = async (error, req, res, next) => {
  const statusCode = error.status || 500
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    stack: error.stack,
    message: error.message || 'Internal Server Error'
  })
}

/**
 * Middleware handler for error.
 * @param {*} fn
 * @returns
 */
const asyncHandler = fn => {
    return (req, res, next) => {
      fn(req, res, next).catch(next)
    }
  }
  

module.exports = {
  initErrorHandler,
  errorHandler,
  asyncHandler
}
