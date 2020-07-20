module.exports = function (mongoose, plugin) {
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
    userProfileSchema.plugin(plugin)

    let User = connection.model("User", userProfileSchema, process.env.USER_COLLY)
    return User
}