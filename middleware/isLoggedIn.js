exports.isLoggedIn = (req, res, next) => {
  console.log("This is the User good", req.user);
  req.user ? next() : res.sendStatus(401);
};
