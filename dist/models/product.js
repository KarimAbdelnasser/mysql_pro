"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.Product = void 0;
var sequelize_1 = require("sequelize");
var db_1 = __importDefault(require("../config/db"));
var user_1 = require("./user");
var joi_1 = __importDefault(require("joi"));
var Product = db_1.default.define("Product", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, { tableName: "products", timestamps: true });
exports.Product = Product;
Product.belongsTo(user_1.User, {
    foreignKey: "user_id",
    targetKey: "id",
    as: "author",
    onDelete: "CASCADE",
});
var schema = joi_1.default.object({
    title: joi_1.default.string().min(5).max(200).required(),
    price: joi_1.default.number().min(1).required(),
    image: joi_1.default.string().min(10),
});
exports.schema = schema;
