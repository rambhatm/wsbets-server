const should = require('chai').should
const assert = require('chai').assert
const mongoose = require('mongoose')
const core = require('../../core/core.js')
const scrappy = require('../../sCrappy/scrappy')
const { before } = require('mocha')


describe("core", function () {

    before(async function () {
        //process.env.STOCK_DB = process.env.STOCK_DB + '_test'
        console.log(process.env.STOCK_DB)
        let numRowsParsed = await scrappy.initStocks()
        assert.notEqual(numRowsParsed, 0)
    })

    after(async function () {
        console.log('after')
        await mongoose.disconnect()


        let conn = await mongoose.connect(process.env.STOCK_DB, { useNewUrlParser: true, useUnifiedTopology: true })
        let dropped = await conn.connection.db.dropDatabase()
        assert.equal(dropped, true)

    })

    it("Gets stock of TSLA", async function () {
        let result = await core.searchSymbol("tsla")
        assert.equal(result.Symbol, "tsla")
    })
})