const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
const ChatRoute = require("./routes/ChatRoute");
const MessageRoute = require("./routes/MessageRoute");
const PostRoute = require("./routes/PostRoute");
const CommentRoute = require("./routes/CommentRoute");
const SearchRoute = require("./routes/SearchRoute");
const User = require("./model/User");
const axios = require("axios")
const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on Port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/chat", ChatRoute);
app.use("/", authRoute);
app.use("/message", MessageRoute);
app.use("/post", PostRoute);
app.use("/comment", CommentRoute);
app.use("/search", SearchRoute);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Import Stripe library and initialize
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post("/checkout", async (req, res) => {
  try {
    const { quantity, price, name, userId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: name,
            },
            unit_amount: price * 100,
          },
          quantity: quantity,
        },
      ],
      success_url: "http://localhost:5173/vip",
      cancel_url: "http://localhost:5173/cancel",
    });

    // Check if userId is provided in the request body
    if (!userId) {
      throw new Error("User ID is missing in the request body");
    }

    // Update the user to VIP
    await User.findByIdAndUpdate(userId, { isVip: true });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = app;
