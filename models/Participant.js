const { model, Schema } = require("mongoose");

const participantSchema = Schema(
  {
    banner: {
        type: Schema.Types.ObjectId,
        ref: "Banner"
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Participant", participantSchema);