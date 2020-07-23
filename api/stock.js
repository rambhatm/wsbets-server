/*  
    protected api
    /auth/stock/
    stock data endpoint for frontend
*/
const mongoose = require('mongoose')
const Stock = require('../models/stock_model')(mongoose)
const Trade = require('../models/trade_model')(mongoose)
const Users = require('../models/user_model')(mongoose)
const router = require('express').Router()

//apis
router.get("/search", searchStocks)
router.post("/trade", tradeStock)

module.exports = router

//functions
async function searchStocks(req, res) {
    try {
        let stock = await Stock.findOne({ Symbol: req.query.query }).exec()
        res.send(stock)
        res.end()
    } catch (error) {
        error.stack
    }
}

async function tradeStock(req, res) {
    try {
        let trade = new Trade({
            userID: req.session.user,
            action: req.body.action,
            symbol: req.body.symbol,
            buyPrice: req.body.buyPrice,
            sellPrice: req.body.sellPrice,
            numShares: req.body.numShares
        })
        let tradeResult = await trade.save()
        let updateUser = await Users.findOneAndUpdate({ userID: req.session.user }, { trades: trades.push(`${tradeResult._id}`) }).exec()
        res.end()
    } catch (error) {
        error.stack
    }
}