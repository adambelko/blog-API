require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
require("./passportConfig")(passport);

const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");

const app = express();

mongoose.set("strictQuery", false);
const mongoDB = `mongodb+srv://${process.env.username}:${process.env.password}@cluster0.nrh9mxe.mongodb.net/?retryWrites=true`;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

app.use("/", indexRouter);

const jwtAuth = passport.authenticate("jwt", { session: false });

app.use("/admin", jwtAuth, adminRouter);

const port = 3000;
app.listen(port);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
