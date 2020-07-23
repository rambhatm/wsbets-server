const router = require('express').Router()
const mongoose = require('mongoose')
const users = require('../models/user_model')(mongoose)
const jwt = require('jsonwebtoken')

router.get('/login_test', async (req, res) => {
    let token = await generateJWT(process.env.TEST_USERID)
    res.send({ token: token })
    res.end()
})

async function generateJWT(userID) {
    //expires in 15 days
    return jwt.sign({ userID: userID }, process.env.JWT_SECRET, { expiresIn: '24h' })
}

function jwtProtect(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.sendStatus(401)//TODO should route to main page

        //res.redirect('/api/reddit/login/login_test')
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }
        console.log(`verified user: ${user.userID}`)
        req.userID = user.userID
        next()
    })
}

module.exports.router = router
module.exports.protect_api = jwtProtect

