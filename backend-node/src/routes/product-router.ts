import express, { NextFunction, Response, Router } from "express";
import * as CommomController from "../controllers/commom-controller";
import { RequestApi } from "../middleware/request-api";
import { ProductModel } from "../models/product-model";

const router: Router = express.Router();

router.get("/product", (req: RequestApi, res: Response, next: NextFunction) => {
    CommomController.findAll(ProductModel, req, res, next);
});

router.get("/product/one", (req: RequestApi, res: Response, next: NextFunction) => {
    CommomController.findOne(ProductModel, req, res, next);
});

router.post("/product", (req: RequestApi, res: Response, next: NextFunction) => {
    CommomController.save(ProductModel, req, res, next);
});

router.get("/product/:id", (req: RequestApi, res: Response, next: NextFunction) => {
    CommomController.findById(ProductModel, req, res, next);
});

router.put("/product/:id", (req: RequestApi, res: Response, next: NextFunction) => {
    CommomController.update(ProductModel, req, res, next);
});
/**
 * @export {express.Router}
 */
export default router;
