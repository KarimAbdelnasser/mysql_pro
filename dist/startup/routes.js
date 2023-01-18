"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var users_1 = require("../routes/users");
var products_1 = require("../routes/products");
module.exports = function (app) {
    app.use(express_1.default.json());
    app.use("/", users_1.usersRouter);
    app.use("/prod", products_1.productsRouter);
};
