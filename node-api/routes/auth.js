const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('../config/config')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const validationRules = require('../lib/validation-rules')
const validate = require('validate.js')
const Response = require('../models/response')
const User = require('../models/user')

/**
 * POST /auth/login
 * To authenticate user
 */
router.post('/login', (req, res, next) => {
  // Gets user data from email
  req.app.locals.db.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return next(err)
    }
    // Compares password
    bcrypt.compare(req.body.password, user.password)
      .then(status => {
        if (status) {
          const payload = {
            id: user._id,
            email: user.email
          }

          // Creating JWT Token
          jwt.sign(
            payload,
            config.passportSecret,
            { expiresIn: config.jwtExpiry },
            (err, token) => {
              if (err) {
                return next(err)
              }
              res.json({ token: 'Bearer ' + token })
            })
        }
      })
      .catch(next)
  })
})

/**
 * GET /auth/test
 * To test authentication, gets all user data
 */
router.get(
  '/test',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    // Creating response object
    const response = new Response(res)
    // List All User Data
    req.app.locals.db.find({}, (err, result) => {
      if (err) {
        return next(err)
      }
      // Sending HTTP Response
      response.data = result
      response.send()
    })
  }
)

/**
 * POST /auth/signup
 * To Sign up new user
 */
router.post('/signup', (req, res, next) => {
  // Creating response object
  const response = new Response(res)
  // Validates form
  const error = validate(req.body, validationRules.signup)
  // sending error response
  if (error) {
    // Setting error info and status
    response.error = error
    response.status = 404
    // Sending HTTP Response
    response.send()
  } else { // Sign's up the user
    const user = new User(req.body)
    bcrypt.genSalt(10)
      .then(salt => {
        bcrypt.hash(user.password, salt)
          .then(hash => {
            // Saving user data with hashed password
            user.password = hash
            req.app.locals.db.insert(user, (err, result) => {
              if (err) {
                return next(err)
              }
              response.message = 'User Created Successfully'
              // Sending HTTP Response
              response.send()
            })
          })
          .catch(next)
      })
      .catch(next)
  }
})

// Exporting router object
module.exports = router
