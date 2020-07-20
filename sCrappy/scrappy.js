const mongoose = require('mongoose');
//const findOrCreatePlugin = require('mongoose-findorcreate');


const Stock = require('../models/stock_model')(mongoose)
const Quote = require('../models/quote_model')(mongoose)
const axios = require('axios').default
const csv = require('@fast-csv/parse');

module.exports = {
    initStocks,
    updateQuote
}

const wsb100 = ['tsla', 'snap', 'amzn', 'aapl', 'msft']

async function initStocks() {
    try {
        resp = await axios.get("https://old.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=nasdaq&render=download")

        csv.parseString(resp.data, { headers: true })
            .on('error', (error) => {
                throw error
            })
            .on('data', async (row) => {
                let symbol = row.Symbol.toLowerCase()
                if (wsb100.indexOf(symbol) != -1) {
                    let stock = new Stock({
                        Symbol: symbol,
                        Name: row.Name,
                        LastSale: row.LastSale,
                        MarketCap: row.MarketCap,
                        IPOyear: row.IPOyear,
                        Sector: row.Sector,
                        Industry: row.industry,
                        URL: row.Summary
                    })
                    await stock.save()
                    let quote = new Quote({
                        Symbol: symbol,
                        price: []
                    })
                    await quote.save()
                }
            })
            .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));
    } catch (error) {

    }
    return
}

async function updateQuote(symbol) {
    url = `https://api.tiingo.com/tiingo/daily/${symbol}/prices`
    options = { "headers": { "Authorization": process.env.T_KEY } }

    try {
        let resp = await axios.get(url, options)
        console.log(resp.data)
        let quote = await Quote.findOneAndUpdate({ "Symbol": symbol }, {
            price: price.push({
                Time: resp.data.date,
                High: resp.data.high,
                Low: resp.data.low,
                Open: resp.data.open,
                Volume: resp.data.volume

            })
        })
        console.log(quote)
        return quote

    } catch (error) {
        error.stack

    }
    return
}