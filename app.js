const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const pizzaRouter = require("./routes/pizzaRouter");
const pastaRouter = require("./routes/pastaRouter");
const SeaFoodRouter = require("./routes/seafoodRouter");
const indexRouter = require("./routes/index");
const UserRouter = require("./routes/users");
const OrderRouter = require("./routes/order");
const ContactRouter = require("./routes/contactus");
const RedirectRouter = require("./routes/redirect");
const app = express();

const PORT = process.env.PORT || 3000;

//Database
const db = require("./config/keys").MongoURI;

require("./config/passport")(passport);

//connection
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => console.log(err));

//BodyParser
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "anything",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//EJS
app.set("view engine", "ejs");

app.use("/", RedirectRouter);
app.use("/home", indexRouter);
app.use("/users", UserRouter);
app.use("/pizza", pizzaRouter);
app.use("/pasta", pastaRouter);
app.use("/seafood", SeaFoodRouter);
app.use("/myorder", OrderRouter);
app.use("/contactus", ContactRouter);
app.use(express.static(__dirname + "/public"));

app.listen(PORT, console.log(`Server is running at http://localhost:${PORT}`));
