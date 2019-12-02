const mongoose = require('mongoose')

// revisa tu connectionURL aqui :-)
const config = require('../config.js')
const connectionURL = process.env.CURL || config.connectionURL 

mongoose.connect( connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
