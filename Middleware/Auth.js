const jwt = require("jsonwebtoken");

console.log("JWT_TOKEN length at startup:", process.env.JWT_TOKEN?.length);


function requireAuth(request, h) {
  console.log("=== AUTH MIDDLEWARE START ===");

  try {
    console.log("Headers:", request.headers);

    const authHeader = request.headers.authorization;
    console.log("Authorization header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ Missing Bearer token");
      return h.response({ message: "Missing Bearer token" }).code(401).takeover();
    }

    const token = authHeader.slice("Bearer ".length);
    console.log("Token received:", token.substring(0, 25) + "...");

    // ✅ använd JWT_SECRET (inte JWT_TOKEN)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    console.log("Decoded:", decoded);

    // ✅ lägg user på request.app (säkert)
    request.app.user = decoded;

    console.log("=== AUTH OK ===");
    console.log("JWT_TOKEN length:", process.env.JWT_TOKEN?.length);
    return h.continue;
  } catch (error) {
    console.error("❌ AUTH ERROR:", error);
    return h.response({ message: "Invalid or expired token" }).code(401).takeover();
  }
}

module.exports = { requireAuth };
