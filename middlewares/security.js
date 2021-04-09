module.exports = {
    checkIfUserConnected: (req, res, next) => {
        if (req.session.user) {
            res.redirect("/home")
        } else
            next()
    },
    checkIfUserNotConnected: (req, res, next) => {
        if (req.session.user) {
            next()
        } else
            res.redirect("/")
    }
}