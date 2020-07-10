const dotenv = require('dotenv')
dotenv.config()
const Stock = require('./models/stock_model')
const axios = require('axios').default
const csv = require('@fast-csv/parse');


const getStocks = async () => {
    try {
        resp = await axios.get("https://old.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=nasdaq&render=download")

        csv.parseString(resp.data, { headers: true })
            .on('error', (error) => {
                throw error
            })
            .on('data', (row) => {
                let stock = new Stock({
                    Symbol: row.Symbol,
                    Name: row.Name,
                    LastSale: row.LastSale,
                    MarketCap: row.MarketCap,
                    IPOyear: row.IPOyear,
                    Sector: row.Sector,
                    Industry: row.industry,
                    URL: row.Summary
                })
                stock.save()
            })
            .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));
    } catch (error) {

    }
}
getStocks()
