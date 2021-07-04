const router = require("express").Router();
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    createFriend,
    deleteFriend,
    deleteUser
}
= require("../../controllers/userControllers");

router
    .route("/")
    .get(getAllUsers)
    .post(createUser);

router
    .route("/:userId")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router
    .route("/:userId/friends/:friendId")
    .post(createFriend)
    .delete(deleteFriend);
    
module.exports = router;