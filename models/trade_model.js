module.exports = function (mongoose) {
    const connection = mongoose.createConnection(process.env.STOCK_DB, { useNewUrlParser: true, useUnifiedTopology: true })


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
        buyPrice: {
            type: Number
        },
        sellPrice: {
            type: Number
        },
        numShares: {
            type: Number,
            required: true
        }


    })

    const Trade = connection.model("Trade", tradeSchema, process.env.TRADE_COLLY)
}
