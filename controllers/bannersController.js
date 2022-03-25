const User = require("../models/User");
const Banner = require("../models/Banner");
const Comment = require("../models/Comment");
const Participant = require("../models/Participant");

module.exports = {
    create: async (req, res) => {
        try {
            if (!req.files || !req.files["bannerdp"]) {
                return res.status(400).json({
                    status: false,
                    message: "No image found",
                });
            }
            const newBanner = {
                author: req.user._id,
                image: req.files["bannerdp"][0].path,
                title: req.body.title,
                description: req.body.description,
                visibility: req.body.visibility,
                category: req.body.category,
            };
            await Banner.create(newBanner)
                .then(banner => {
                    if (!banner) return res.status(400).json({
                        status: false,
                        message: "Banner not created",
                    });

                    return res.status(201).json({
                        status: true,
                        data: banner,
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
};