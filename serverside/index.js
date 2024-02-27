const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/routes");
const groupRoutes = require("./routes/groupRoutes");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 8000;
dotenv.config();
app.use("/api", router);
app.use("/api", groupRoutes);

// *************** DEPLOYMENT ***************

const __dirname1 = path.join(__dirname, "../");
// console.log(__dirname1);
// console.log(path.join(__dirname1, "/frontend/build"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    return res.send("Server is running");
  });
}

// *************** DEPLOYMENT ***************

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log(`Example app listening on port 8000`);
    })
    .catch((error) => {
      console.log("connection Failed :- ", error);
    });
});
