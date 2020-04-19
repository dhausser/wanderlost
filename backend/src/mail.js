"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var transport = nodemailer_1.default.createTransport({
    // host: process.env.MAIL_HOST,
    // port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});
exports.transport = transport;
var makeANiceEmail = function (text) { return "\n  <div classname=\"email\" style=\"\n    border: 1px solid black;\n    padding: 20px;\n    font-family: sans-serif;\n    line-height: 2;\n    font-size: 20px;\n  \">\n    <h2>Hello there</>\n    <p>" + text + "</p>\n\n    <p>\uD83D\uDE18, Dave Boss</p>\n  </div?\n"; };
exports.makeANiceEmail = makeANiceEmail;
