const should = require('chai').should
const assert = require('chai').assert
const core = require('../../core/core.js')
const scrappy = require('../../sCrappy/scrappy')


describe("core", async function () {
    it("Init stocks ", async function() {
        let numRowsParsed = await scrappy.initStocks()
        assert.notEqual(numRowsParsed, 0)
    })

    it("Gets stock of TSLA", async function () {
        let result = await core.searchSymbol("tsla")
        assert.equal(result.Symbol, "tsla")
    })
})