const User = require("../models/user");

exports.userLogin = (req, res, next) => {
  res.send("user logged in");
  //   res.render("admin/edit-product", {
  //     pageTitle: "Add Product",
  //     path: "/admin/add-product",
  //     editing: false,
  //   });
};
