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