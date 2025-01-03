function authRequest(req, res, next) {
    if (req.user == null) {
        return res.status(401).json({ message: 'Authentikation failed' });
    } else {
        next();
    }
}


export default authRequest;