"use strict";

const { mongoose } = require("../configs/dbConnection");

const PurchaseSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    firm_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Firm",
      required: true,
    },

    brand_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },

    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      default: 0,
    },

    price_total: {
      type: Number,
      default: function () {
        return this.price * this.quantity;
      },
      transform: function () {
        return this.price * this.quantity;
      },
    },
  },
  { collection: "purchases", timestamps: true }
);

/* ------------------------------------------------------- */

PurchaseSchema.pre("init", function (data) {
  data.id = data._id;
  data.createds = data.createdAt.toLocaleDateString("tr-tr");
});
/* ------------------------------------------------------- */
module.exports = mongoose.model("Purchase", PurchaseSchema);
