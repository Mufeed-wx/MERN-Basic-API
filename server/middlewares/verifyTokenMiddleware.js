const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1];
    console.log(token);
    !token && res.status(403).json("A token is required for authentication")
    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decode
       
    } catch (error) {
        return res.status(401).json("Invalid Token");
    }
    return next();
}

module.exports = verifyToken;