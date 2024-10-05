const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token given.' });
    }

    try {
        const tokensecret = jwt.verify(token, 'abc');  
        req.user = tokensecret;  
        next(); 
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or no token.' });
    }
};

module.exports = verifyToken;
