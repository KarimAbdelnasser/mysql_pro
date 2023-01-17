"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
module.exports = function generateAuthToken(id, username) {
    var token = jsonwebtoken_1.default.sign({ _id: id, username: username }, process.env.jwtPrivateKey);
    return token;
};
