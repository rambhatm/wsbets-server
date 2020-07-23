const mongoose = require('mongoose');


const schedule = require('node-schedule')
const Stock = require('../models/stock_model')(mongoose)
const Quote = require('../models/quote_model')(mongoose)
const axios = require('axios').default
const csv = require('@fast-csv/parse');

module.exports = {
    initStocks,
    updateQuote,
    startScrappy,
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
    options = { "headers": { "Authorization": process.env.T_KEY, 'Content-Type': 'application/json' } }

    try {
        let resp = await axios.get(url, options)
        const stock = resp.data[0]
        // console.log(stock)
        let quote = await Quote.findOneAndUpdate({ Symbol: symbol }, {
            "$push": {
                "price": {
                    Time: stock.date,
                    High: stock.high,
                    Low: stock.low,
                    Open: stock.open,
                    Volume: stock.volume

                }
            }
        })
        return quote

    } catch (error) {
        error.stack

    }
    return
}

//Starts the scrappy service
async function startScrappy() {
    //Get end of day quote on trading days at 4:05 PM EST
    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [new schedule.Range(1, 5)];
    rule.hour = 19;
    rule.minute = 5;

    var j = schedule.scheduleJob(rule, async () => {
        console.log("Running scrappy...")
        wsb100.forEach(sym => {
            updateQuote(sym)
        })
    })
}