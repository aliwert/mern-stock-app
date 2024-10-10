"use strict";

const { mongoose } = require("../configs/dbConnection");

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    image: {
      type: String,
      trim: true,
    },
  },
  { collection: "brands", timestamps: true }
);

BrandSchema.pre("init", function (data) {
  data.id = data._id;
  data.createds = data.createdAt.toLocaleDateString("tr-tr");
});

module.exports = mongoose.model("Brand", BrandSchema);
