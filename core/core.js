//All stock trading functionality will be here


const mongoose = require('mongoose')
const Stock = require('../models/stock_model')(mongoose)
const Trade = require('../models/trade_model')(mongoose)
const Users = require('../models/user_model')(mongoose)
const Quote = require('../models/quote_model')(mongoose)

module.exports = {
    searchSymbol
}

async function searchSymbol(symbol) {
    try {
        let stock = await Stock.findOne({ Symbol: req.query.query }).exec()
        let quote = await Quote.findOne({ Symbol: req.query.query }).exec()

        //let result = await Promise.all([stock,quote])
        stock.Price = quote.price
        return stock
    } catch (error) {
        error.stack
    }
}

async function buyStock(symbol, userID, numStocks) {
    try {
        //Get price of stock and user profile
        //let user = 


        //Check if they have enough money for trade

        //Now trade
        let trade = new Trade({
            userID: userID,
            action: 'buy',
            symbol: symbol,
            buyPrice: req.body.buyPrice,
            numShares: numStocks
        })
        let tradeResult = await trade.save()
        let updateUser = await Users.findOneAndUpdate({ userID: req.session.user }, { trades: trades.push(`${tradeResult._id}`) }).exec()
        res.end()
    } catch (error) {
        error.stack
    }
}