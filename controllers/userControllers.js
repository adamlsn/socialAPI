const { User } = require("../models");

const userControllers = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: "user",
                select: "-__v"
            })
            .select("-__v")
            .sort({ _id: -1})
            .then(dbData => res.json(dbData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    }
}

module.exports = userControllers;