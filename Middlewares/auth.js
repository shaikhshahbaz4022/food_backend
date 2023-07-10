const jwt = require('jsonwebtoken');

function Auth(req, res, next) {
    const token = req.headers.authorization
    var decoded = jwt.verify(token, 'secret')

}
module.exports = Auth