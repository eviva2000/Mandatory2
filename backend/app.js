const express = require("express");
const app = express(); // We import the express function, invoke it—returning an object—and save that into a constant app
app.use(express.urlencoded({ extended: false })); //These two lines allow us to parse the body of an HTTP request and parse a JSON payload
app.use(express.json());
const cors = require("cors");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
/*  Setting up database */
const { Model } = require("objection");
const Knex = require("knex");
const knexFile = require("./knexfile.js");

const knex = Knex(knexFile.development);

// Give the knex instance to objection.
Model.knex(knex);

// Session
const session = require("express-session");
app.use(
  session({
    name: "sid",
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

//limit the amount o fthe requests on the auth routes
// const rateLimit = require("express-rate-limit");
// const authlimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 4, // limit each IP to 100 requests per windowMs
// });
// app.use("/users/login", authlimiter);
// app.use("/users/register", authlimiter);
const User = require("./models/Users");

/* Set up routes with our server instance */
//const homeRoute = require("./routes/home");
const getUsersRoute = require("./routes/getAllMembers");
const singleUserRoute = require("./routes/getSingleUser");
const playgroundRoute = require("./routes/playground.js");
const usersRoute = require("./routes/users.js");
const resetpassword = require("./routes/resetpassword");
// only use the custom middleware for the secondpath route
app.use(playgroundRoute);

//app.use(homeRoute);
//app.use(getUsersRoute);
app.use(usersRoute);
app.use(singleUserRoute);
app.use(resetpassword);

/* Start the server */
const port = process.env.PORT || 9090;

const server = app.listen(port, (error) => {
  if (error) {
    console.log(port, error);
  }
  console.log("The server is running on port", server.address().port);
});
