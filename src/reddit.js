/*
    /api/reddit/
    Handles reddit user authentication
*/
const crypto = require('crypto')
const passport = require('passport')
const router = require('express').Router()
const RedditStrategy = require('passport-reddit').Strategy
const users = require('./models/user_model')

router.get("/login", login)
router.get("/callback", loginCallback)
router.get("/logout", logout)

module.exports = {
    router: router,
    // Use the RedditStrategy within Passport.
    // Strategies in Passport require a `verify` function, which accept
    // credentials (in this case, an accessToken, refreshToken, and Reddit
    // profile), and invoke a callback with a user object.
    // callbackURL must match redirect uri from your app settings
    strategy: new RedditStrategy({
        clientID: process.env.REDDIT_KEY,
        clientSecret: process.env.REDDIT_SECRET,
        callbackURL: "http://127.0.0.1:3000/api/reddit/callback"
    }, verifyUser),
    // Simple route middleware to ensure user is authenticated.
    //   Use this route middleware on any resource that needs to be protected.  If
    //   the request is authenticated (typically via a persistent login session),
    //   the request will proceed.  Otherwise, the user will be redirected to the
    //   login page.
    protectAPI: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/api/reddit/login')
    }
}

// GET /auth/reddit
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Reddit authentication will involve
//   redirecting the user to reddit.com.  After authorization, Reddit
//   will redirect the user back to this application at /auth/reddit/callback
//
//   Note that the 'state' option is a Reddit-specific requirement.
function login(req, res, next) {
    req.session.state = crypto.randomBytes(32).toString('hex')
    passport.authenticate('reddit', {
        state: req.session.state,
        scope: ['identity'],
        duration: 'permanent'
    })(req, res, next)
}
// GET /auth/reddit/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
function loginCallback(req, res, next) {
    passport.authenticate('reddit', {
        successRedirect: '/dashboard',
        failureRedirect: '/api/reddit/login'
    })(req, res, next)

}
function logout(req, res) {
    req.logout()
    res.redirect('/')
}

async function verifyUser(accessToken, refreshToken, profile, done) {
    try {
        let userProfile = await users.findOrCreate({ userID: profile.id }, { redditProfile: profile._json })
        return done(null, userProfile)
    } catch (error) {
        return done(error, null)
    }
}