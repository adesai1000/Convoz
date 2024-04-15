const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
const ChatRoute = require("./routes/ChatRoute");
const MessageRoute = require("./routes/MessageRoute");
const PostRoute = require("./routes/PostRoute")
const CommentRoute = require("./routes/CommentRoute")
const SearchRoute = require("./routes/SearchRoute");
const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY)
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

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use("/chat", ChatRoute);
app.use("/", authRoute);
app.use("/message", MessageRoute);
app.use("/post", PostRoute);
app.use("/comment", CommentRoute)
app.use("/search", SearchRoute)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


//STRIPE INTEGRATION
app.post("/checkout", async(req,res)=>{
  try{
    const session = await stripe.checkout.sessions.create({
      payment_method_types: [card],
      mode: "payment",
      line_items: req.body.items.map(item=>{
        return{
          price_data:{
            currency:"usd",
            product_data:{
            name:item.name
            },
            unit_amount:(item.price)*100,
          },
          quantity:item.quantity
        }
      }),
      success_url:"http://localhost:5173/success",
      cancel_url:"http://localhost:5173/cancel"
    })
    res.json({url:session.url})
  }
  catch(error){
    res.status(500).json({error:error.message})
  }
})