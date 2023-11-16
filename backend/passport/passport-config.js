const passport = require('passport')
const Account = require('../database/Account')
const jwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
require('dotenv').config()

const option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}
passport.use('jwt',new jwtStrategy(option, async(payload, done) => {
    try {
        console.log(payload)
        const user = await Account.findOne({username: payload.username})
        if(user) return done(null,user.username)
        return done(null,false)
        
    } catch (err) {
        return done(err,false)
    }
}))

module.exports = passport