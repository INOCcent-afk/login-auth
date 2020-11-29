const express = require("express");
const signupRouter = require("./routes/signup");
const mongoose = require("mongoose");
const User = require("./models/Users");
const { db } = require("./models/Users");
const app = express();

require("dotenv/config");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/signup", signupRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const checkUser = db
    .collection("users")
    .findOne({ username: req.body.username });

  checkUser.then((user) => {
    if (user == null) {
      res.redirect("/signup");
    } else {
      res.send(`<h1>HELLO ${user.username}</h1>`);
    }
  });

  //   res.send("/");
});

mongoose.connect(
  process.env.ATLAS_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 0,
    socketTimeoutMS: 0,
    family: 4,
  },
  () => console.log("CONNECTED TO SERVER")
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
