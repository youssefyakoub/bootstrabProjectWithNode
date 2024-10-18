const express = require("express");
const app = express();
const port = process.env.PORT ||3000;
const mongoose = require("mongoose");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

var methodOverride = require("method-override");
app.use(methodOverride("_method"));

const allRoutes = require("./routes/allRoutes")
const addUser = require("./routes/addUser")
const editUser = require("./routes/editUser")

// auto refresh

const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

mongoose
  .connect(
    "mongodb+srv://devjoe:wnRakDa7LiHO1HsB@cluster0.pjvsm.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });





app.use(allRoutes)
app.use("/user/add.html",addUser)
app.use("/edit",editUser)

