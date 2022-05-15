require('express-async-errors')
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
const { userRouter, postRouter, profileRouter } = require('./routes')

// middlewares
const { notFound, errHandler } = require('./middleware')
const passport = require('passport')

app.use(passport.initialize())
require('./passport/passport')(passport)

app.get('/', (req, res) => {
  res.send('hellow from server')
})

app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/profile', profileRouter)

app.use(notFound)
app.use(errHandler)
// connect to monngose atlas and server
mongoose
  .connect(process.env.MONGO_URI)
  .then(
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
  )
  .catch((err) => console.log(err))
