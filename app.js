require('dotenv').config()
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("hbs");
const passport = require("passport");
hbs.registerHelper('isActive', (a, b) => a === b ? 'active' : ''); // for nav links

require("./app_api/models/db");

require("./app_api/config/passport");

const indexRouter = require("./app_server/routes/index");
const usersRouter = require("./app_server/routes/users");
const travelRouter = require("./app_server/routes/travel");
const apiRouter = require("./app_api/routes/index");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "app_server", "views"));

// register handlebars partials (https://www.npmjs.com/package/hbs#partials)
hbs.registerPartials(path.join(__dirname, "app_server", "views/partials"));

app.set("view engine", "hbs");

// set the default layout template
hbs.localsAsTemplateData(app);
app.locals.layout = "layouts/layout";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

// allow CORS
app.use("/api", (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:4200")
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	)
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
	next()
})

app.use("/", indexRouter);
app.use("/about", indexRouter);
app.use("/users", usersRouter);
app.use("/travel", travelRouter);
app.use("/api", apiRouter);

app.use(express.static(path.join(__dirname, "public")));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// catch unauthorized error and create 401
app.use(function (err, req, res, next) {
	if (err.name === "UnauthorizedError") {
		res.status(401)
		res.json({ message: err.name + ": " + err.message })
	}
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
