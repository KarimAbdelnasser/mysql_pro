import express from "express";
import dotenv from "dotenv";
import routes from "./startup/routes";
import dbConnection from "./startup/dbConnection";
dotenv.config();

const app = express();
const PORT = 8080 || process.env.PORT;
routes(app);
dbConnection();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});

export default app;
