import { Response, Request, Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import generateAuthToken from "../utilities/authToken";
import auth from "../middleware/auth";
const router = Router();

router.post(
    "/signUp",
    async (req: Request, res: Response): Promise<void | Response> => {
        try {
            const exist = await User.findOne({
                where: { username: req.body.username },
            });
            if (exist) return res.status(400).send("User already registered.");
            let { username, password, email } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            let user = await User.create({
                username: username,
                password: hashedPassword,
                email: email,
            });
            let newUser = await user.get({ plain: true });
            const token = generateAuthToken(newUser.id, username);
            res.status(201).send(`Created new user & token= ${token}`);
        } catch (err) {
            console.log(err);
        }
    }
);

router.get(
    "/logIn",
    auth,
    async (
        req: Request & { user?: any },
        res: Response
    ): Promise<void | Response> => {
        try {
            const exist = await User.findOne({
                where: { username: req.user.username, id: req.user._id },
            });
            if (!exist)
                return res.status(400).send("User haven't registered yet!");
            res.status(200).send(`Logged In successfully`);
        } catch (err) {
            console.log(err);
        }
    }
);

export { router as usersRouter };
