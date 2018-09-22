const JwStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
// const bycrypt = require('bcryptjs')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = require('./config').passportSecret

module.exports = (passport, db) => {
  // bycrypt.genSalt(10, (err, salt) => {
  //   if (err) {
  //     console.log(err)
  //   }
  //   bycrypt.hash('pass@123', salt, (err, hash) => {
  //     if (err) {
  //       console.log(err)
  //     }
  //     db.insert({
  //       email: 'test@dm.com',
  //       password: hash
  //     }, (err, doc) => {
  //       if (err) {
  //         console.log(err)
  //       }
  //       console.log(doc)
  //     })
  //   })
  // })
  passport.use(
    new JwStrategy(opts, (payload, done) => {
      db.findOne({ _id: payload.id }, (err, user) => {
        if (err) {
          console.log(err)
        }
        if (user) {
          done(null, user)
        }
        done(null, false)
      })
    })
  )
}
