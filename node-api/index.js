// Express framework
const express = require('express')
// Package to Enable CORS
const cors = require('cors')
// Package to parse HTTP body
const bodyParser = require('body-parser')
// Form validation Package
const validate = require('validate.js')
// Database Package
const Datastore = require('nedb')
// Authentication Packages
const passport = require('passport')
// ======================= Configuration ======================================
const app = express()
const port = 5000

// Adding CORS middleware
app.use(cors())
// Adding body-parser middleware
app.use(bodyParser.json())
// Database configuration
app.locals.db = new Datastore({ filename: './data.db', autoload: true })

// Removes all data
// db.remove({}, { multi: true }, function (err, numRemoved) {
// })

// Adding Passport
app.use(passport.initialize())
require('./config/passport')(passport, app.locals.db)

// Routing
const authRoute = require('./routes/auth')
app.use('/auth/', authRoute)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`)
})
