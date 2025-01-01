const jwt = require('jsonwebtoken');


function initRequestContext(req, res, next) {
    req.user = null;

    const token = req.cookies.access_token ?? req.headers['authorization'];

    if (!!token) {
        jwt.verify(token, process.env.AUTH_JWT_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
            } else {
                req.user = {
                    email: decoded.email
                };
            }
            next();
        });    
    } else {
        next();
    }
}


module.exports = initRequestContext;