import express from "express";
import app from "../server";
import { usersRouter } from "../routes/users";
import { productsRouter } from "../routes/products";

export = (app: express.Application) => {
    app.use(express.json());
    app.use("/", usersRouter);
    app.use("/prod", productsRouter);
};
