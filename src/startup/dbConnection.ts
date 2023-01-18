import sequelize from "../config/db";
import mysql from "mysql2/promise";
export = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });
        await connection.query(
            `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`
        );
        await connection.end();
        await sequelize.sync({ force: false });
        console.log("All models were synchronized successfully.");
    } catch (err) {
        console.log("Unable to connect to the database: ", err);
    }
};
