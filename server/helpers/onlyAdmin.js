const onlyAdmin = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).send({ err: "you need to log in" })
    }
    if (req.session.user.isAdmin == 0) {
        return res.status(401).send({ err: "only for admin" })
    }
    next()
}

module.exports = onlyAdmin

