const mongoose = require('mongoose');
const stockConnection = mongoose.createConnection(process.env.STOCK_DB, { useNewUrlParser: true, useUnifiedTopology: true })

const tradeSchema = new mongoose.Schema({
    date: {
        type: String,
        default: Date.now
    },
    userID: String,
    action: {
        type: String,
        enum: ['buy', 'sell'],
        required: true
    },
    symbol: {
        type: String,
        required: true
    },


})

stockSchema.index({ Symbol: 1, unique: true })


const Stock = stockConnection.model("Stock", stockSchema, process.env.STOCK_COLLY)
module.exports = Stock