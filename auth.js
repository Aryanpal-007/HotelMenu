//  used for authentication

const person = require('./models/person')

const passport = require('passport')  // importing passport API
const LocalStrategy = require('passport-local').Strategy  // importing username and password strategy


// authentication
passport.use(new LocalStrategy(async (USERNAME, PASSWORD, done) => {
    // authentication logic

    try {

        const user = await person.findOne({ username: USERNAME })
        if (!user) {
            return done(null, false, { message: "Incorrect username" })
        }

        const matchPassword = await user.comparePassword(PASSWORD)
        if (matchPassword) {
            return done(null, user)
        }
        else {
            return done(null, false, { message: "Incorrect Password" })
        }
    }
    catch (err) {
        return done(err)
    }


}))


module.exports =  passport; //export configured passoport