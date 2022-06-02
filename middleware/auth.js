const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  console.log(req.headers
    )
  const token =
    req.body.token || req.query.token || req.headers.authorization;
    // console.log(token)

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    // const decoded = jwt.verify(token, config.TOKEN_KEY);
    const decoded = token.decoded;
    req.user = decoded;
    next()
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};
module.exports = verifyToken;
