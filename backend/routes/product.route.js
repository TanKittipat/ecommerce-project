const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");
const { upload, uploadToFirebase } = require("../middlewares/file.middleware");

// create new product
router.post("/", upload, uploadToFirebase, ProductController.createProduct)

// get all products
router.get("/", ProductController.getAllProducts);

// get product by id
router.get("/:id", ProductController.getProductById);

// delete product by id
router.delete("/:id", ProductController.deleteProduct);

// update product by id
router.put("/:id", upload, uploadToFirebase, ProductController.updateProduct);

module.exports = router;
