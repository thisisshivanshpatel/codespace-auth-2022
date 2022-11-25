const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  //grab a token
  const { token } = req.cookies;

  if (!token) {
    res.status(400).json({ message: "token not provided" });
  }

  try {
    //decode that token and get id
    const decode = jwt.verify(token, "mySecret");

    //query to DB for that user id

    req.user = decode;
  } catch (error) {
    throw Error(error?.message);
  }

  return next();
};

module.exports = auth;
