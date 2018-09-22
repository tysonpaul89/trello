const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('../config/config')
const jwt = require('jsonwebtoken')
const passport = require('passport')
/**
 * POST /auth/login
 * To authenticate user
 */
router.post('/login', (req, res) => {
  // Gets user data from email
  req.app.locals.db.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(err)
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
            { expiresIn: 3600 },
            (err, token) => {
              if (err) {
                console.log(err)
              }

              res.json({ token: 'Bearer ' + token })
            })
        }
      })
      .catch(err => console.log(err))
  })
})

router.get(
  '/test',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ message: 'Auth Successful' })
  })

module.exports = router
