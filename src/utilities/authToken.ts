import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
declare var process: any;
export = function generateAuthToken(id: string, username: string) {
    const token = jwt.sign({ _id: id, username }, process.env.jwtPrivateKey);
    return token;
};
