const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('user');

passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
		},
		(username, password, done) => {
			User.findOne({ email: username }, (err, user) => {
				if (err) { // error
					return done(err)
				}

				if (!user) { // no user found
					return done(null, false, {
						message: "Incorrect username.",
					})
				}

				if (!user.validPassword(password)) { // incorrect password 
					return done(null, false, {
						message: "Incorrect password.",
					})
				}

				// if credentials are correct, return the user object
				return done(null, user)
			})
		}
	)
)
