const { StatusCodes } = require('http-status-codes')
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
app.use(express.json())

// models
const User = require('./models/user.model')
// port
const PORT = process.env.PORT || 5000

// routes
const { userRouter } = require('./routes')
const { notFound, errHandler } = require('./middleware')

app.get('/', (req, res) => {
  res.send('hellow from server')
})

app.use('/users', userRouter)

// not found route
app.use(notFound)

// global error handler
app.use(errHandler)

mongoose
  .connect(process.env.MONGO_URI)
  .then(
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
  )
  .catch((err) => console.log(err))
