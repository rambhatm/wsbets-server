//contains sceme & functionality of user profile used during authentication

require('./models/user_model')


module.exports = {
    getUserProfile: async (id) => {
        try {
            let profile = await userProfile.findOne({ userID: id }).exec()
            return profile
        } catch (err) {
            err.stack
        }
    },

    createNewUser: async (id, redditProfile) => {
        try {
            let newProfile = new userProfile({
                userID: id,
                redditProfile: redditProfile
            })
            await newProfile.save().exec();
        } catch (err) {
            err.stack;
        }
    }
}
