"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
var express_1 = require("express");
var auth_1 = __importDefault(require("../middleware/auth"));
var product_1 = __importDefault(require("../models/product"));
var image_1 = __importDefault(require("../utilities/image"));
var fs = __importStar(require("fs"));
var router = (0, express_1.Router)();
exports.productsRouter = router;
//Get all products for chosen user
router.get("/getAllProd", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, product_1.default.findAll({
                        where: { user_id: req.user._id },
                    })];
            case 1:
                products = _a.sent();
                if (products.length === 0) {
                    return [2 /*return*/, res.status(404).send("You have no products yet!")];
                }
                else {
                    res.status(200).send(products);
                }
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log("An error!", err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Get an product by ID
router.get("/getProd/:id", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, product_1.default.findOne({
                        where: { id: req.user._id },
                    })];
            case 1:
                product = _a.sent();
                res.status(200).send(product);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.log("An error!");
                res.status(404).send("No product has found with this given ID!");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Add a new product
router.post("/addProd", auth_1.default, image_1.default.single("img"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, title, price, product, imgPath, product, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                userId = req.user._id;
                _a = req.body, title = _a.title, price = _a.price;
                if (!!req.file) return [3 /*break*/, 2];
                return [4 /*yield*/, product_1.default.create({
                        title: title,
                        price: price,
                        user_id: userId,
                    })];
            case 1:
                product = _b.sent();
                return [3 /*break*/, 4];
            case 2:
                imgPath = req.file.path;
                return [4 /*yield*/, product_1.default.create({
                        title: title,
                        price: Number(price),
                        user_id: userId,
                        image: imgPath,
                    })];
            case 3:
                product = _b.sent();
                _b.label = 4;
            case 4:
                res.status(201).send("Created new product successfully!");
                return [3 /*break*/, 6];
            case 5:
                err_3 = _b.sent();
                console.log(err_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
//Remove a product
router.post("/removeProd/:id", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, productId, auth;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user._id;
                productId = Number(req.params.id);
                return [4 /*yield*/, product_1.default.findOne({ where: { id: productId } })];
            case 1:
                auth = _a.sent();
                if (!auth) {
                    return [2 /*return*/, res
                            .status(400)
                            .send("There is no product with the given product id")];
                }
                else if (auth.dataValues.user_id !== userId) {
                    return [2 /*return*/, res.status(401).send("Not Authorized!")];
                }
                return [4 /*yield*/, product_1.default.destroy({ where: { id: productId } })];
            case 2:
                _a.sent();
                return [4 /*yield*/, fs.unlink(auth.dataValues.image, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("".concat(auth.dataValues.image, " was deleted."));
                        }
                    })];
            case 3:
                _a.sent();
                res.send("Product with id ".concat(productId, " has been Deleted successfully!"));
                return [2 /*return*/];
        }
    });
}); });
//Update a product
router.put("/editProd/:id", auth_1.default, image_1.default.single("img"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, newImg, newPrice, userId, auth_2, product, updates, editedProd, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                productId = Number(req.params.id);
                newImg = req.file;
                newPrice = Number(req.body.price);
                userId = req.user._id;
                return [4 /*yield*/, product_1.default.findOne({ where: { id: productId } })];
            case 1:
                auth_2 = _a.sent();
                if (!!auth_2) return [3 /*break*/, 2];
                return [2 /*return*/, res
                        .status(400)
                        .send("There is no product with the given product id")];
            case 2:
                if (!(auth_2.dataValues.user_id !== userId)) return [3 /*break*/, 3];
                return [2 /*return*/, res.status(401).send("Not Authorized!")];
            case 3:
                if (!(!newImg && !newPrice)) return [3 /*break*/, 4];
                return [2 /*return*/, res
                        .status(400)
                        .send("Invalid data to update a product!")];
            case 4: return [4 /*yield*/, product_1.default.findOne({
                    where: { id: productId },
                })];
            case 5:
                product = _a.sent();
                if ((newImg === null || newImg === void 0 ? void 0 : newImg.path) === (product === null || product === void 0 ? void 0 : product.dataValues.image) &&
                    newPrice === (product === null || product === void 0 ? void 0 : product.dataValues.price)) {
                    return [2 /*return*/, res
                            .status(400)
                            .send("You have to add new values not the originals!")];
                }
                updates = {};
                if (newImg && newImg.path !== (product === null || product === void 0 ? void 0 : product.dataValues.image)) {
                    updates.image = newImg.path;
                }
                if (newPrice && newPrice !== (product === null || product === void 0 ? void 0 : product.dataValues.price)) {
                    updates.price = newPrice;
                }
                return [4 /*yield*/, product_1.default.update(updates, {
                        where: { id: productId },
                    })];
            case 6:
                editedProd = _a.sent();
                return [2 /*return*/, res
                        .status(201)
                        .send("This product has been updated successfully!")];
            case 7: return [3 /*break*/, 9];
            case 8:
                err_4 = _a.sent();
                console.log(err_4);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
