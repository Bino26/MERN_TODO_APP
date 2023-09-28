const jwt = require('jsonwebtoken');

// Middleware to check user authorization
exports.jwtAuth = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ error: 'User not authorized' });
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET);
        // Attach the user ID to the request object for further processing
        req.user = { userId: payload.userId }; 
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
