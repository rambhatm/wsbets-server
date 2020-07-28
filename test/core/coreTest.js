const should = require('chai').should
const assert = require('chai').assert
const mongoose = require('mongoose')
const core = require('../../core/core.js')
const scrappy = require('../../sCrappy/scrappy')
const { before } = require('mocha')


describe("core trading tests", function () {

    before(async function () {
        let numRowsParsed = await scrappy.initStocks()
        assert.notEqual(numRowsParsed, 0)
    })

    after(async function () {
        await mongoose.disconnect()

        let conn = await mongoose.connect(process.env.STOCK_DB, { useNewUrlParser: true, useUnifiedTopology: true })
        let dropped = await conn.connection.db.dropDatabase()
        assert.equal(dropped, true)
    })


    it("Gets stock of TSLA", async function () {
        let result = await core.searchSymbol("tsla")
        console.log(result)
        assert.equal(result.Symbol, "tsla")
    })
})