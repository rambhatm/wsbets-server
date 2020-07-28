const should = require('chai').should
const assert = require('chai').assert
const mongoose = require('mongoose')
const core = require('../../core/core.js')
const scrappy = require('../../sCrappy/scrappy')
const { before } = require('mocha')


describe("core", async function () {
    process.env.STOCK_DB += '_test'
    before(async function(){
        let numRowsParsed = await scrappy.initStocks()
        assert.notEqual(numRowsParsed, 0)
    })

    after(async function(){
        let conn = await mongoose.createConnection(process.env.STOCK_DB, { useNewUrlParser: true, useUnifiedTopology: true })
        await conn.dropDatabase()

    })

    it("Gets stock of TSLA", async function () {
        let result = await core.searchSymbol("tsla")
        assert.equal(result.Symbol, "tsla")
    })
})