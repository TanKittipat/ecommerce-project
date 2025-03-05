const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const UserRoute = require("./routes/user.route");
const ProductRoute = require("./routes/product.route");
const CartItemRoute = require("./routes/cart.route");
const StripeRoute = require("./routes/stripe.route");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

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
  res.send("<h1>Hello, e-commerce!</h1>");
});

// Stripe webhook must use raw body
app.use("/api/v1/stripe/webhook", express.raw({ type: "application/json" }));
// Make app use json
app.use(express.json());

// Make app use router
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/auth", UserRoute);
app.use("/api/v1/products", ProductRoute);
app.use("/api/v1/cartItems", CartItemRoute);
app.use("/api/v1/stripe", StripeRoute);

// Make app listen on selected port
app.listen(port, () => {
  console.log("Listening on: http://localhost:" + port);
});
