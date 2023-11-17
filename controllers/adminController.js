const Admin = require("../models/admin");

exports.adminLogin = (req, res, next) => {
  res.send("Admin logged in");
  //   res.render("admin/edit-product", {
  //     pageTitle: "Add Product",
  //     path: "/admin/add-product",
  //     editing: false,
  //   });
};
