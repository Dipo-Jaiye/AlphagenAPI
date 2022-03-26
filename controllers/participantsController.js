const User = require("../models/User");
const Banner = require("../models/Banner");
const Comment = require("../models/Comment");
const Participant = require("../models/Participant");

module.exports = {
    create: async (req, res) => {
        try {
            if (!req.files || !req.files["userdp"]) {
                return res.status(400).json({
                    status: false,
                    message: "No image found",
                });
            }
            const newParticipant = {
                image: req.files["userdp"][0].path,
                banner: req.body.banner,
            };
            await Participant.create(newParticipant)
                .then(participant => {
                    if (!participant) return res.status(400).json({
                        status: false,
                        message: "Participant not added",
                    });

                    return res.status(201).json({
                        status: true,
                        data: participant,
                    });
                })
                .catch(err => {
                    console.log(err);
                    return res.status(400).json({
                        status: false,
                        message: err.message,
                    });
                })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: error.message,
            });
        }
    },

    getone: (req, res) => {

    },

    getall: (req, res) => {

    },

    update: (req, res) => {

    },

    delete: (req, res) => {

    }
}