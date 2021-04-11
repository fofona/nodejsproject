module.exports = {
    checkIfUsersConnected: (req, res, next) => {
        if (req.session.users) {
            res.redirect("/home")
        } else
            next()
    },
    checkIfUsersNotConnected: (req, res, next) => {
        if (req.session.users) {
            next()
        } else
            res.redirect("/")
    }
}