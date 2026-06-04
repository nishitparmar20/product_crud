const express = require("express");
const { Register } = require("../User/Register");
const { Add } = require("../Product/Add");
const {Auth} = require("../middleware/Auth");
const { Edit } = require("../Product/Edit");
const { Delete } = require("../Product/Delete");
const { Fetch } = require("../Product/Fetch");
const { Login } = require("../User/Login");
const { ForgotPassword } = require("../User/ForgotPassword");
const { ResetPassword } = require("../User/ResetPassword");
const { Search } = require("../Product/Search");
const { upload } = require("../uploads/multer");
const { Single } = require("../Product/Single");


const router = express.Router();

router.post("/forgot-password", ForgotPassword);
router.post("/reset-password", ResetPassword);

router.post("/register", Register);
router.post("/login", Login);
router.get("/search",Search);
router.post(
   "/add",
   Auth,
   upload.single("image"),
   Add
);
router.put("/edit/:id", Auth, Edit);
router.get("/single/:id",Single);
router.delete("/delete/:id", Auth, Delete);

router.get("/list",Auth,Fetch);
module.exports = router;


