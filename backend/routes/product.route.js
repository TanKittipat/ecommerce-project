const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");
const { upload, uploadToFirebase } = require("../middlewares/file.middleware");
const authJwt = require("../middlewares/auth.middleware");

// create new product
router.post(
  "/",
  authJwt.verifyToken,
  authJwt.isAdmin,
  upload,
  uploadToFirebase,
  ProductController.createProduct
);

// get all products
router.get("/", ProductController.getAllProducts);

// get product by id
router.get("/:id", ProductController.getProductById);

// delete product by id
router.delete(
  "/:id",
  authJwt.verifyToken,
  authJwt.isAdmin,
  ProductController.deleteProduct
);

// update product by id
router.put(
  "/:id",
  authJwt.verifyToken,
  authJwt.isAdmin,
  upload,
  uploadToFirebase,
  ProductController.updateProduct
);

module.exports = router;
