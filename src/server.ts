import express from "express";
const app = express();
const PORT = 8080;
import { usersRouter } from "./routes/users";
import { productsRouter } from "./routes/products";
import sequelize from "./config/db";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

(async () => {
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
})();

app.use(express.json());
app.use("/", usersRouter);
app.use("/prod", productsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});

export default app;
