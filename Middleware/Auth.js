const jwt = require("jsonwebtoken");

function requireAuth(req, h) {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return h.response({ message: "Missing Bearer Token"}).code(401).takeover();
    }

    const token = authHeader.slice("Bearer ".length);

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.auth = {credentials: decoded};
        return h.continue;
    } catch(error) {
        return h.response ({message: "Invalid or expired token"}).code(401).takeover();
    }
}

module.exports = {requireAuth};