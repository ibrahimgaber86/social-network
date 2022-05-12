const { StatusCodes } = require('http-status-codes')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
app.use(express.json())

// models
const User = require('./models/user.model')
require('dotenv').config()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('hellow from server')
})

app.post('/', async (req, res, next) => {
  try {
    const { userName } = req.body
    console.log(userName)
    const user = await User.create({ userName })
    console.log(user)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// not found route
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).send('page not found')
})
// global error handler
app.use((err, req, res, next) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
  )
  .catch((err) => console.log(err))
