"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var db_1 = __importDefault(require("../config/db"));
var user_1 = __importDefault(require("./user"));
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
Product.belongsTo(user_1.default, {
    foreignKey: "user_id",
    targetKey: "id",
    as: "author",
    onDelete: "CASCADE",
});
exports.default = Product;
