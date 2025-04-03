import mongoose from "mongoose";
import { sendMail, genrateRandom } from "../utils/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    photoID: {
      type: String,
    },
    isBan: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    refreshToken: {
      type: String,
    },
    permissions: [String],
    otp: {
      type: String,
    },
  },
  { timestamps: true }
);

schema.methods.sendOTP = async function (subject="DeathCode - OTP Account Verification Mail") {
  const otp = genrateRandom();
  this.otp = otp;
  const res = await sendMail(this.email,subject , {
    text: `OTP Verification - ${otp}
    Please don't share this OTP to anyone.`,
    html: `<head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OTP </title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                    text-align: center;
                }
                p {
                    color: #555;
                    font-size: 16px;
                    line-height: 1.6;
                    text-align: center;
                }
                .otp {
                    background-color: #007bff;
                    color: #fff;
                    padding: 10px 20px;
                    border-radius: 5px;
                    font-size: 24px;
                    text-align: center;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>OTP Verification</h1>
                <p>Dont Share this to anyone else.</p>
                <div class="otp">${otp}</div>
            </div>
        </body>
`,
  });
  await this.save();
  return res;
};
schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }
  next();
});

schema.methods.genrateAccessToken = function (res) {
  const token = jwt.sign(
    { username: this.username, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXP }
  );
  const cookiesOption = {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV == "production",
  };
  if (process.env.NODE_ENV == "production") {
    cookiesOption.domain = "deathcode.in";
  }
  res.cookie("accessToken", token, cookiesOption);
  return token;
};
schema.methods.logout = async function (res) {
  const cookiesOption = {
    maxAge: 0,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV == "production",
  };
  if (process.env.NODE_ENV == "production") {
    cookiesOption.domain = "deathcode.in";
  }
  res.cookie("accessToken", "", cookiesOption);
  this.refreshToken = "";
  await this.save();
  return 
};
schema.methods.genrateRefreshToken = async function () {
  const token = jwt.sign(
    { username: this.username, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXP }
  );
  this.refreshToken = token;
  await this.save();
  return token;
};
schema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};
export const User = mongoose.model("User", schema);
