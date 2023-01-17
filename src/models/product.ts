import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import User from "./user";
const Product = sequelize.define(
    "Product",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    { tableName: "products", timestamps: true }
);
Product.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "id",
    as: "author",
    onDelete: "CASCADE",
});
export default Product;
