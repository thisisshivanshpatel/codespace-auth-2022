require("dotenv").config();
require("./database/database").connect();
const User = require("./database/model/user");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the CodeSpace Express server");
});

app.post("/register", async (req, res) => {
  try {
    //get all data from body
    const { firstname, lastname, email, password } = req.body;

    //all the data should exists
    if (!(firstname && lastname && email && password)) {
      res.status(400).send("All fields are compulsory");
    }

    //check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(401).send("Email already exist");
    }

    //encrypt the password
    const myEncPassword = await bcrypt.hash(password, 10);

    // save the user in db
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: myEncPassword,
    });

    // generate a token for user and send it
    const token = jwt.sign({ id: user._id, email }, "mySecret", {
      expiresIn: "2d",
    });

    user.token = token;
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    //get all data from frontend
    const { email, password } = req.body;

    //validation
    if (!(email && password)) {
      res.status(400).send("send all data");
    }

    //find user in DB
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "email id is not registered" });
    }

    //match the password
    //  await bcrypt.compare(password,user.password);

    let token;
    if (user && (await bcrypt.compare(password, user.password))) {
      // generate a token for user and send it
      token = jwt.sign({ id: user._id, email }, "mySecret", {
        expiresIn: "2d",
      });
    }
    user.token = token;
    user.password = undefined;

    //cookies
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res
      .status(200)
      .cookie("token", token, options)
      .json({ success: true, token, user });
  } catch (error) {
    console.log(error);
  }
});
module.exports = app;
