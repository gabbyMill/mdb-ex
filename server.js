import dotenv from "dotenv";
import app from "./app.js";
import mongoose from "mongoose";

dotenv.config();
const port = process.env.PORT || 3000;

const url = process.env.MONGODB_URI;
(async () => {
  try {
    await mongoose.connect(url);
    console.log(`Mongo Connected`);
  } catch (err) {
    console.log(`Error connecting to Mongo ${err.message}`);
  }
})();

app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`);
});
