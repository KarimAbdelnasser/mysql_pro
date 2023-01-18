"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var routes_1 = __importDefault(require("./startup/routes"));
var dbConnection_1 = __importDefault(require("./startup/dbConnection"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = 8080 || process.env.PORT;
(0, routes_1.default)(app);
(0, dbConnection_1.default)();
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT, "..."));
});
exports.default = app;
