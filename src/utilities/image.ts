import multer from "multer";
import path from "path";
import { Request } from "express";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, `../../dist/images/`));
    },
    filename: function (req: Request & { user?: any }, file, cb) {
        cb(null, req.user._id + "_" + file.originalname);
    },
});
const upload = multer({ storage });
export default upload;
