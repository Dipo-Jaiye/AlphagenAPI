const { model, Schema } = require("mongoose");

const commentSchema = Schema(
  {
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    body: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Comment", commentSchema);