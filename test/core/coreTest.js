const should = require('chai').should
const assert = require('chai').assert
const core = require('../../core/core.js')

describe("core", async function () {
    it("Gets stock of TSLA", async function () {
        let result = await core.searchSymbol("tsla")
        assert.equal(result.Symbol, "tsla")
    })
})