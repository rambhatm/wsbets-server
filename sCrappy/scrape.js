const dotenv = require('dotenv')
dotenv.config({ path: "../.env" })
const Stock = require('../models/stock_model')
const axios = require('axios').default
const csv = require('@fast-csv/parse');

const wsb100 = ['tsla', 'snap', 'amzn', 'aapl', 'msft']

async function getStocks() {
    try {
        resp = await axios.get("https://old.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=nasdaq&render=download")

        csv.parseString(resp.data, { headers: true })
            .on('error', (error) => {
                throw error
            })
            .on('data', (row) => {
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
                    stock.save()
                }
            })
            .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));
    } catch (error) {

    }
    return
}

async function getQuote(symbol) {
    url = `https://api.tiingo.com/tiingo/daily/${symbol}/prices`
    options = { "headers": { "Authorization": process.env.T_KEY } }

    try {
        resp = await axios.get(url, options)

    } catch (error) {
        error.stack

    }

}



getStocks()
