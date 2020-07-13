const mongoose = require('mongoose');
const connection = mongoose.createConnection(process.env.USER_DB, { useNewUrlParser: true, useUnifiedTopology: true })

const userProfileSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    trades: {
        type: [String]
    },
    redditProfile: mongoose.Schema.Types.Mixed
})

let userProfile = connection.model("User", userProfileSchema, process.env.USER_COLLY)
module.exports = userProfile