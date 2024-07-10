const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const DBModel = mongoose.model(
  "resturents",
  mongoose.Schema({
    name: {
      type: String,
    },
    location: {
      type: String,
    },
    rating: {
      type: Number,
    },
    menu: {
      type: Array,
    },
    "open time": {
      type: String,
    },
    distance: {
      type: String,
    },
  })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log("DB connection failed"));

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/restaurants", async (req, res) => {
  const resturents = await DBModel.find();
  res.json(resturents);
});

app.get("/restaurants/:id", async (req, res) => {
  const resturent = await DBModel.findById(req.params.id);
  res.json(resturent);
});

app.get("/restaurants/search/:query", (req, res) => {
  let query = req.params.query || "";
  query = query.toLowerCase();
  console.log(query);
  const results = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(query) ||
      restaurant.cuisine.toLowerCase().includes(query)
  );
  res.json(results);
});

// Get restaurants by category of food
app.get("/restaurants/food/:category", (req, res) => {
  const category = req.params.category.toLowerCase();
  const results = restaurants.filter((restaurant) =>
    restaurant.foods.some((food) => food.toLowerCase().startsWith(category))
  );
  res.json(results);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
