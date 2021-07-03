const router = require("express").Router();
const {
    getAllUsers
}
= require("../../controllers/userControllers");

router
    .route("/")
    .get(getAllUsers)

module.exports = router;