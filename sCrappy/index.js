const dotenv = require('dotenv')
dotenv.config()

const scrappy = require('./scrappy')

scrappy.initStocks()
scrappy.updateQuote('tsla')