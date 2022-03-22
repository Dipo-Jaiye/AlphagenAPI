const { model, Schema } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = Schema(
  {
    email: {
      type: String,
      unique: true
    },
    username: {
      type: String,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = model("User", userSchema);