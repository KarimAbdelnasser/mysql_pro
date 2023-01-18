import { Response, Request, Router } from "express";
import auth from "../middleware/auth";
import { Product, schema } from "../models/product";
import upload from "../utilities/image";
import * as fs from "fs";
import { User } from "../models/user";
const router = Router();

//Get all products for chosen user
router.get(
    "/getAllProd",
    auth,
    async (
        req: Request & { user?: any },
        res: Response
    ): Promise<void | Response> => {
        try {
            const user = await User.findOne({ where: { id: req.user._id } });
            if (!user) {
                return res.status(404).send("You haven't registered yet!");
            }
            const products = await Product.findAll({
                where: { user_id: req.user._id },
                attributes: ["title", "price", "image", "createdAt"],
            });
            if (products.length === 0) {
                return res.status(404).send("You have no products yet!");
            }
            return res.status(200).send(products);
        } catch (err) {
            console.log("An error!", err);
        }
    }
);

//Get an product by ID
router.get(
    "/getProd/:id",
    auth,
    async (
        req: Request & { user?: any },
        res: Response
    ): Promise<void | Response> => {
        try {
            const user = await User.findOne({ where: { id: req.user._id } });
            if (!user) {
                return res.status(404).send("You haven't registered yet!");
            }
            const product = await Product.findOne({
                where: {
                    user_id: req.user._id,
                    id: req.params.id,
                },
                attributes: ["title", "price", "image", "createdAt"],
            });
            if (!product) {
                return res
                    .status(404)
                    .send("No product has found with this given ID!");
            }
            res.status(200).send(product);
        } catch (err) {
            console.log("An error!");
            res.status(404).send("No product has found with this given ID!");
        }
    }
);

//Add a new product
router.post(
    "/addProd",
    auth,
    upload.single("img"),
    async (
        req: Request & { user?: any },
        res: Response
    ): Promise<void | Response> => {
        try {
            const user = await User.findOne({ where: { id: req.user._id } });
            if (!user) {
                return res.status(404).send("You haven't registered yet!");
            }
            const userId: number = req.user._id;
            const { title, price } = req.body;
            const { error } = schema.validate(req.body);
            if (error) {
                return res.status(400).send(error.details[0].message);
            }
            let records: Record<string, any> = {
                title: title,
                price: price,
                user_id: userId,
            };
            if (req.file) {
                const imgPath: string = req.file.path;
                records.image = imgPath;
            }
            await Product.create(records);
            res.status(201).send(`Created a new product successfully!`);
        } catch (err) {
            console.log(err);
        }
    }
);

//Remove a product
router.post(
    "/removeProd/:id",
    auth,
    async (
        req: Request & { user?: any },
        res: Response
    ): Promise<void | Response> => {
        try {
            const user = await User.findOne({ where: { id: req.user._id } });
            if (!user) {
                return res.status(404).send("You haven't registered yet!");
            }
            const userId = req.user._id;
            const productId: number = Number(req.params.id);
            const product = await Product.findOne({ where: { id: productId } });
            if (!product) {
                return res
                    .status(400)
                    .send(`There is no product with the given product id`);
            }
            if (product.dataValues.user_id !== userId) {
                return res.status(401).send("Not Authorized!");
            }
            await Product.destroy({ where: { id: productId } });
            await fs.unlink(product.dataValues.image, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`${product.dataValues.image} was deleted.`);
                }
            });
            res.status(201).send(
                `Product with id ${productId} has been deleted successfully!`
            );
        } catch (err) {
            console.log(err);
        }
    }
);

//Update a product
router.put(
    "/editProd/:id",
    auth,
    upload.single("img"),
    async (
        req: Request & { user?: any },
        res: Response
    ): Promise<void | Response> => {
        try {
            const productId: number = Number(req.params.id);
            const newImg = req.file;
            const newPrice: number = Number(req.body.price);
            const userId = req.user._id;
            const user = await User.findOne({ where: { id: req.user._id } });
            if (!user) {
                return res.status(404).send("You haven't registered yet!");
            }
            const product = await Product.findOne({ where: { id: productId } });
            if (!product) {
                return res
                    .status(400)
                    .send(`There is no product with the given product ID!`);
            } else if (product.dataValues.user_id !== userId) {
                return res.status(401).send("Not Authorized!");
            } else if (!newImg && !newPrice) {
                return res
                    .status(400)
                    .send("Invalid data to update a product!");
            } else {
                if (
                    newImg?.path === product?.dataValues.image &&
                    newPrice === product?.dataValues.price
                ) {
                    return res
                        .status(400)
                        .send("You have to add new values not the originals!");
                }
                let updates: Record<string, any> = {};
                if (newImg && newImg.path !== product?.dataValues.image) {
                    updates.image = newImg.path;
                }
                if (newPrice && newPrice !== product?.dataValues.price) {
                    updates.price = newPrice;
                }
                await Product.update(updates, {
                    where: { id: productId },
                });
                return res
                    .status(201)
                    .send(`The product has been updated successfully!`);
            }
        } catch (err) {
            console.log(err);
        }
    }
);

export { router as productsRouter };
