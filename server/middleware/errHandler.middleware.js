const { StatusCodes } = require('http-status-codes')

const errHandler = (err, req, res, next) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

module.exports = errHandler
