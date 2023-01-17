"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var sequelize = new sequelize_1.Sequelize("".concat(process.env.DB_NAME), "".concat(process.env.DB_USER), "".concat(process.env.DB_PASSWORD), {
    host: "".concat(process.env.DB_HOST),
    dialect: "mysql",
});
exports.default = sequelize;
