const { Thought } = require("../models")
const { params } = require("../routes");

const thoughtController = {
    getAllThoughts(req, res){
        Thought.find({})
            .select("-__v")
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    getThoughtById({ params }, res){
        Thought.findOne({ _id: params.thoughtId })
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({ message: "No thought found with this ID" });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createThought({ body }, res){
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: {thoughts: _id }},
                    { new: true }
                );
            })
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({ message: "No user found with this ID" });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    updateThought({ params, body }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId}, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({ message: "No thought found with this ID" });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    deleteThought({ params }, res){
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    return res.status(404).json({ message: "No thought found with this ID" });                 
                }
                return User.findOneAndUpdate(
                    { username: dbThoughtData.username },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                )
            })
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({ message: "No user found with this ID" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createReaction({ params, body }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            {new: true, runValidators: true }
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: "No user found with this ID" });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    deleteReaction({ params }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $pull: { reactions: {reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
}

module.exports = thoughtController;