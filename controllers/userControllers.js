const { User } = require("../models");
const { params } = require("../routes");

const userControllers = {
    getAllUsers(req, res) {
        User.find({})
            .then(dbData => res.json(dbData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    },

    getUserById({ params }, res){
        User.findOne({ _id: params.userId })
            .then(dbData => {
                if(!dbData){
                    res.status(404).json({message: "No user found with this ID"});
                    return;
                }
                res.json(dbData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createUser({ body }, res){
        User.create(body)
            .then(dbData => res.json(dbData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    updateUser({ params, body }, res){
        User.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true })
            .then(dbData => {
                if(!dbData){
                    res.status(404).json({ message: "No user found with this ID"});
                    return;
                }
                res.json(dbData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    deleteUser({ params }, res){
        User.findOneAndDelete({ _id: params.userId})
            .then(dbData => {
                if(!dbData){
                    res.status(404).json({ message: "No user found with this ID"})
                }
                res.json(dbData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    createFriend({ params }, res){
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: {friends: params.friendId }},
            { new: true, runValidators: true }
        )
            .then(dbData =>{
                if(!dbData){
                    res.statud(404).json({ message: "No user found with this ID" });
                    return;
                }
                res.json(dbData);
            })
            .catch(err =>{
                console.log(err);
                res.status(400).json(err);
            })
    },

    deleteFriend({ params }, res){
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId }},
            { new: true }
        )
            .then(dbData =>{
                if(!dbData){
                    res.status(404).json({ message: "No user found with this ID" });
                    return;
                }
                res.json(dbData);
            })
            .catch(err =>{
                console.log(err);
                res.status(400).json(err);
            });
    }
}

module.exports = userControllers;