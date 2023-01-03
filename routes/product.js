import express from "express";
import formidable from "express-formidable";


const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";
// controllers
import {
  create,
  list,
  read,
  photo,
  remove,
  update,

  productsCount,
  listProducts,
 
  
  getToken,
  processPayment,
  orderStatus,
} from "../controllers/product.js";

router.post("/product", requireSignin, isAdmin, formidable(), create);
router.get("/products", list);
router.get("/product/:productId", read);
router.get("/photo/:productId", photo);
router.delete("/product/:productId", requireSignin, isAdmin, remove);
router.post(
  "/product/:productId",
  requireSignin,
  isAdmin,
  formidable(),
  update
);

router.get("/products-count", productsCount);
router.get("/list-products/:page", listProducts);



router.get("/braintree/token", getToken);
router.post("/braintree/payment", requireSignin, processPayment);
router.put("/order-status/:orderId", requireSignin, isAdmin, orderStatus);

export default router;
