import { Router } from "express";
import { authorizeAdmin } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
} from "../controllers/product.controller.js";
import uploadImages from "../middlewares/multer.middleware.js";

const productRouter = Router();

productRouter.post("/", authorizeAdmin, uploadImages, createProduct);

productRouter.get("/", getProducts);

productRouter.get("/:id", getProductById);

productRouter.delete("/:id", authorizeAdmin, deleteProduct);

export default productRouter;
