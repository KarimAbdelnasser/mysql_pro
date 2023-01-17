import { Response, Request, Router } from "express";
const router = Router();
import auth from "../middleware/auth";
import Product from "../models/product";
import upload from "../utilities/image";
import * as fs from "fs";

//Get all products for chosen user
router.get(
    "/getAllProd",
    auth,
    async (
        req: Request & { user?: any },
        res: Response
    ): Promise<void | Response> => {
        try {
            const products = await Product.findAll({
                where: { user_id: req.user._id },
            });
            if (products.length === 0) {
                return res.status(404).send("You have no products yet!");
            } else {
                res.status(200).send(products);
            }
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
            const product = await Product.findOne({
                where: { id: req.user._id },
            });
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
            const userId: number = req.user._id;
            let { title, price } = req.body;
            if (!req.file) {
                const product = await Product.create({
                    title: title,
                    price: price,
                    user_id: userId,
                });
            } else {
                const imgPath: string = req.file.path;
                const product = await Product.create({
                    title: title,
                    price: Number(price),
                    user_id: userId,
                    image: imgPath,
                });
            }
            res.status(201).send(`Created new product successfully!`);
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
        const userId = req.user._id;
        const productId: number = Number(req.params.id);
        const auth = await Product.findOne({ where: { id: productId } });
        if (!auth) {
            return res
                .status(400)
                .send(`There is no product with the given product id`);
        } else if (auth.dataValues.user_id !== userId) {
            return res.status(401).send("Not Authorized!");
        }
        await Product.destroy({ where: { id: productId } });
        await fs.unlink(auth.dataValues.image, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`${auth.dataValues.image} was deleted.`);
            }
        });
        res.send(`Product with id ${productId} has been Deleted successfully!`);
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
            const auth = await Product.findOne({ where: { id: productId } });
            if (!auth) {
                return res
                    .status(400)
                    .send(`There is no product with the given product id`);
            } else if (auth.dataValues.user_id !== userId) {
                return res.status(401).send("Not Authorized!");
            } else if (!newImg && !newPrice) {
                return res
                    .status(400)
                    .send("Invalid data to update a product!");
            } else {
                const product = await Product.findOne({
                    where: { id: productId },
                });
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
                const editedProd = await Product.update(updates, {
                    where: { id: productId },
                });
                return res
                    .status(201)
                    .send(`This product has been updated successfully!`);
            }
        } catch (err) {
            console.log(err);
        }
    }
);

export { router as productsRouter };
