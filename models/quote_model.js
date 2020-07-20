module.exports = function (mongoose) {
    const stockConnection = mongoose.createConnection(process.env.STOCK_DB, { useNewUrlParser: true, useUnifiedTopology: true })

    const quoteSchema = new mongoose.Schema({
        Symbol: {
            type: String,
            index: true,
            unique: true
        },
        price: [{
            Time: Date,
            High: Number,
            Low: Number,
            Open: Number,
            Volume: Number
        }]
    })

    quoteSchema.query.getQuote = function (Symbol) {

    }


    const Quote = stockConnection.model("Quote", quoteSchema, process.env.QUOTE_COLLY)
    return Quote
}
