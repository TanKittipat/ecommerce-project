const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const UserRoute = require("./routes/user.route")
const ProductRoute = require("./routes/product.route")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

const port = process.env.PORT;
const db_url = process.env.DB_URL;
const frontend_url = process.env.FRONTEND_URL;

// Create app
const app = express();

// Connect to database
try {
  mongoose.connect(db_url);
  console.log("Connected to database successfully!");
} catch (error) {
  console.log("Something error occurred while connect DB: " + error);
}

// Allow frontend access
app.use(cors({ origin: frontend_url, credentials: true }));

// Show landing page
app.get("/", (req, res) => {
  res.send("<h1>Hello, ecommerce!</h1>");
});

// Make app use json
app.use(express.json());

// Make app use router
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use("/api/v1/auth", UserRoute);
app.use("/api/v1/products", ProductRoute);

// Make app listen on selected port
app.listen(port, () => {
  console.log("Listening on: http://localhost:" + port);
});
