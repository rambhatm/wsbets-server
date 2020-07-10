//const dotenv = require('dotenv')
//dotenv.config({
//    path: "../.env"
//})

const mongoose = require('mongoose');
const stockConnection = mongoose.createConnection(process.env.STOCK_DB, { useNewUrlParser: true, useUnifiedTopology: true })

const stockSchema = new mongoose.Schema({
    Symbol: String,
    Name: String,
    LastSale: String,//num
    MarketCap: String,//num
    IPOyear: String,
    Sector: String,
    Industry: String,
    URL: String

})

stockSchema.index({ Symbol: 1, unique: true })


const Stock = stockConnection.model("Stock", stockSchema, process.env.STOCK_COLLY)
module.exports = Stock