const { model, Schema } = require("mongoose");

const bannerSchema = Schema(
  {
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Banner", bannerSchema);