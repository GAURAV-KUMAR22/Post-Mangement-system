import JWT from 'jsonwebtoken';

export default async function AuthenticationCheck(req, res, next) {
    const token = await req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Access Denied. No token provided." });
    }

    try {
        const decoded = JWT.verify(token.split(" ")[1], process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).json({ error: "Invalid token" });
    }
    next();
}
