const jsonwebtoken = require("jsonwebtoken");

function authentify(req, res, next) {
  const token = req.cookies.token;
  // console.log("Token:", token);
  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.redirect("/login");
  }
}
module.exports = authentify;
