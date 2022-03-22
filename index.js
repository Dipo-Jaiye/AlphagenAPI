const express = require("express");
const passport = require("passport");
const cors = require("cors");
const app = express();
const router = require("./routes");
const db = require("./db");
const passjwtStrat = require("./controllers/userController").passjwt;
const User = require("./models/User");

// database connection
db.connect();

const port = process.env.PORT || process.env.port || 8080;

// middleware
app.use(cors());
app.options(cors({
    origin: true,
    credentials: true,
    maxAge: 86400
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
passport.use(User.createStrategy());
passport.use(passjwtStrat);

app.use("api/v1/", router);

app.listen(port, () => console.log(`App listening on ${port}`));