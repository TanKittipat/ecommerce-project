const ProductModel = require("../models/product.model");

exports.createProduct = async (req, res) => {
  // Create new product
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

exports.getAllProducts = async (req, res) => {
  // Get all product
  /**
    #swagger.tags = ['Product']
    #swagger.summary = "Get all product"
    #swagger.description = 'Endpoint to fetch all product data'
    #swagger.response[200] = {
       schema:{ "$ref": "#components/schemas/ProductResponse"},
       description: "Fetching all products successfully"
    }
  */
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

exports.getProductById = async (req, res) => {
  // Get product by Id
  /**
    #swagger.tags = ['Product']
    #swagger.summary = "Get product by Id"
    #swagger.description = 'Endpoint to fetch a product data by using id'
    #swagger.response[200] = {
       schema:{ "$ref": "#components/schemas/ProductResponse"},
       description: "Fetching product successfully"
    }
  */
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

exports.deleteProduct = async (req, res) => {
  // Delete product by Id
  /**
    #swagger.tags = ['Product']
    #swagger.summary = "Delete product by Id"
    #swagger.description = 'Endpoint to delete a product data by using id'
    #swagger.response[200] = {
       schema:{ "$ref": "#components/schemas/ProductResponse"},
       description: "Delete product successfully"
    }
  */
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

exports.updateProduct = async (req, res) => {
  // Update product data
  /**
    #swagger.tags = ['Product']
    #swagger.summary = "Update product data"
    #swagger.description = 'Endpoint to update product data'
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
       description: "Update product data successfully"
    }
  */
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
