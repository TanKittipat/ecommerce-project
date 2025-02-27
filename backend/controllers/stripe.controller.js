const Stripe = require("stripe");
const stripe = new Stripe(process.env.stripeKey);

exports.createCheckOutSession = async (req, res) => {
  const cartItems = req.body.cart;
  const products = cartItems.map((item) => {
    return {
      productId: item.productId,
      quantity: item.quantity,
    };
  });
  const customer = await stripe.customers.create({
    metadata: {
      email: req.body.email.toString(),
      cart: JSON.stringify(products),
    },
  });
  const line_items = cartItems.map((item) => {
    return {
      price_data: {
        currency: "thb",
        product_data: {
          name: item.productName,
          image: item.productImage,
          description: item.productName,
          metadata: {
            id: item.productId,
          },
        },
        unit_amount: item.productPrice * 100,
      },
      quantity: item.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "promptpay"],
    shipping_address_collection: {
      allowed_countries: ["TH"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "thb",
          },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: {
              unit: "business day",
              value: 5,
            },
            maximum: {
              unit: "business day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 4500,
            currency: "thb",
          },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: {
              unit: "business day",
              value: 1,
            },
            maximum: {
              unit: "business day",
              value: 1,
            },
          },
        },
      },
    ],
    line_items,
    customer: customer.id,
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/checkout-success`,
    cancel_url: `${process.env.FRONTEND_URL}/cart`,
  });
};
