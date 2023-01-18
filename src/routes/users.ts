import { Response, Request, Router } from "express";
import bcrypt from "bcrypt";
import { User, schema } from "../models/user";
import generateAuthToken from "../utilities/authToken";
import auth from "../middleware/auth";
const router = Router();

//Sign Up
router.post(
    "/signUp",
    async (req: Request, res: Response): Promise<void | Response> => {
        try {
            const { error } = schema.validate(req.body);
            if (error) {
                return res.status(400).send(error.details[0].message);
            }
            const exist = await User.findOne({
                where: { username: req.body.username },
            });
            if (exist) return res.status(400).send("User already registered.");

            const { username, password, email } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await User.create({
                username: username,
                password: hashedPassword,
                email: email,
            });
            const newUser = await user.get({ plain: true });
            const token = generateAuthToken(newUser.id, username);
            res.status(201).send(`Created new user & token= ${token}`);
        } catch (err) {
            console.log(err);
        }
    }
);

//Log In
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
