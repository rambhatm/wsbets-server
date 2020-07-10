/*  
    protected api
    /auth/stock/
    stock data endpoint for frontend
*/
const Stock = require('./models/stock_model')
const router = require('express').Router()

//apis
router.get("/search", searchStocks)

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

async function buyStock(req, res) {
    try {
        let trade = new Trade({

        })
    } catch (error) {

    }
}