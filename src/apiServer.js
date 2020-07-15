const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()

const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override');
const morgan = require('morgan')
const passport = require('passport')

//vuejs app production
//const publicRoot = '../app/dist'


app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
// express session middleware setup
app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
// passport middleware setup ( it is mandatory to put it after session middleware setup)
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function (user, done) {
    done(null, user)
});

passport.deserializeUser(function (obj, done) {
    done(null, obj)
});

const reddit = require('./reddit')
const test_login = require('./test_login')


passport.use(reddit.strategy)


const stocksRouter = require('./stock')



//app.use(app.router)
/* Deployment stuff
app.get("/", (req, res, next) => {
    res.sendFile("index.html", { root: publicRoot })
})
*/

//Reddit authentication endpoints
//app.use('/api/reddit', reddit.router)
app.use('/api/reddit/login', test_login.router)
//Stock endpoints
app.use('/api/stock', stocksRouter)
//test dash
app.get('/dashboard', test_login.protect_api, (req, res) => {
    res.end(`dashboard user ${req.userID}`)
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`server started on http://localhost:${process.env.SERVER_PORT}`)

})

