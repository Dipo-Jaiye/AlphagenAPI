const mongoose = require("mongoose");

const { MONGO_URI, MONGO_USER, MONGO_PASS,
    MONGO_DB, SESSION_SECRET, MONGO_FULL_URI } = require('../config');

exports.connect = async () => {
    await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: MONGO_USER,
        pass: MONGO_PASS,
        dbName: MONGO_DB,
        retryWrites: true,
        w: "majority"
    }).then(() => {
        console.log("MongoDB database connected");
    })
        .catch(err => {
            console.error(`Error connecting DB: ${err.message}`);
        });

};