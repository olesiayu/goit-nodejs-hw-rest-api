const { Schema, model } = require("mongoose");
const Joi = require("joi");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const schema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, {}, true);
      },
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: function () {
        return v4();
      },
      required: [true, "Verify token is required"],
    },
  },
  { timestamps: true }
);

const User = model("user", schema);

const schemaRegister = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
});

const schemaLogin = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

const schemaResend = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = {
  User,
  schemaRegister,
  schemaLogin,
  schemaResend,
};
