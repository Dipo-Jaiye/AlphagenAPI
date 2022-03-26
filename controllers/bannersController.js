const User = require("../models/User");
const Banner = require("../models/Banner");
const Comment = require("../models/Comment");
const Participant = require("../models/Participant");

module.exports = {
    create: async (req, res) => {
        try {
            if (!req.body.title) {
                return res.status(400).json({
                    status: false,
                    message: "Title is required",
                });
            }

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

    getone: async (req, res) => {
        try {
            await Banner.findById(req.params.id).then(banner => {
                if (!banner) {
                    return res.status(404).json({
                        status: false,
                        message: "Banner with that id not found",
                    });
                }
                return res.status(200).json({
                    status: true,
                    data: banner,
                });
            }).catch(err => {
                return res.status(400).json({
                    status: false,
                    message: err.nessage,
                });
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: error.message,
            });
        }
    },

    getall: async (req, res) => {
        try {
            await Banner.find().then(banners => {
                if (!banners) {
                    return res.status(404).json({
                        status: false,
                        message: "No banners found",
                    });
                }
                return res.status(200).json({
                    status: true,
                    data: banners,
                });
            }).catch(err => {
                return res.status(400).json({
                    status: false,
                    message: err.nessage,
                });
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: error.message,
            });
        }
    },

    update: (req, res) => {

    },

    delete: (req, res) => {

    }
};