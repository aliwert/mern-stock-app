"use strict";
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- *
{
    "username": "admin",
    "password": "aA*123456",
    "email": "admin@site.com",
    "first_name": "admin",
    "last_name": "admin",
    "is_active": true,
    "is_staff": true,
    "is_superadmin": true
}
{
    "username": "staff",
    "password": "aA*123456",
    "email": "staff@site.com",
    "first_name": "staff",
    "last_name": "staff",
    "is_active": true,
    "is_staff": true,
    "is_superadmin": false
}
{
    "username": "test",
    "password": "aA*123456",
    "email": "test@site.com",
    "first_name": "test",
    "last_name": "test",
    "is_active": true,
    "is_staff": false,
    "is_superadmin": false
}
/* ------------------------------------------------------- */
// User Model:

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },

    first_name: {
      type: String,
      trim: true,
      required: true,
    },

    last_name: {
      type: String,
      trim: true,
      required: true,
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    is_staff: {
      type: Boolean,
      default: false,
    },

    is_superadmin: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "users", timestamps: true }
);

const passwordEncrypt = require("../helpers/passwordEncrypt");

UserSchema.pre(["save", "updateOne"], function (next) {
  const data = this?._update || this;

  const isEmailValidated = data.email
    ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) // test from "data".
    : true;

  if (isEmailValidated) {
    if (data?.password) {
      const isPasswordValidated =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
          data.password
        );

      if (isPasswordValidated) {
        this.password = data.password = passwordEncrypt(data.password);
        this._update = data; // updateOne will wait data from "this._update".
      } else {
        next(new Error("Password not validated."));
      }
    }

    next();
  } else {
    next(new Error("Email not validated."));
  }
});

UserSchema.pre("init", function (data) {
  data.id = data._id;
  data.createds = data.createdAt.toLocaleDateString("tr-tr");
});

module.exports = mongoose.model("User", UserSchema);
