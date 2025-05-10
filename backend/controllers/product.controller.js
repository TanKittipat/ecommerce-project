const ProductModel = require("../models/product.model");

// create new post
/**
    #swagger.tags = ['Product']
    #swagger.summary = "Create a new product"
    #swagger.description = 'Endpoint to create a new product'
    #swagger.consumes = ['multipart/form-data']
    #swagger.parameters['file'] = {
       in:'formData',
       type:'file',
       required:true,
       description:'Image to upload to Firebase Storage and get its url'
    }
    #swagger.requestBody = {
       required:true,
       content:{
         "multipart/form-data":{
           schema:{
             $ref:"#components/schemas/NewProduct"
           }
         }
       }
    }
    #swagger.response[200] = {
       schema:{ "$ref": "#components/schemas/ProductResponse"},
       description: "Product created successfully"
    }
  */
exports.createProduct = async (req, res) => {
  const { name, description, price, category } = req.body;
  if (!name || !description || !price || !category) {
    return res.status(400).json({ message: "Please provide all fields!" });
  }
  if (!req.file) {
    return res.status(400).json({ message: "Image is required!" });
  }
  try {
    const newProduct = await ProductModel.create({
      name,
      description,
      price,
      category,
      image: req.file.firebaseUrl,
    });
    res
      .status(200)
      .json({ message: "Adding new product successfully.", newProduct });
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Something error occurred while adding new products!",
    });
  }
};

// get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Something error occurred while fetching products!",
    });
  }
};

// get product by id
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Something error occurred while fetching product!",
    });
  }
};

// delete product by id
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    await product.deleteOne();
    res.status(200).json({ message: "Product deleted." });
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Something error occurred while deleting product!",
    });
  }
};

// update product by id
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    const { name, description, price, category } = req.body;
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "Please fill in all fields!" });
    }
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    if (req.file) {
      product.image = req.file.firebaseUrl;
    }
    await product.save();
    res.status(200).json({ message: "Product updated.", product });
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Something error occurred while updating product!",
    });
  }
};
