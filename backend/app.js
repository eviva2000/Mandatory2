const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*  Setting up database */
const { Model } = require("objection");
const Knex = require("knex");
const knexFile = require("./knexfile.js");

const knex = Knex(knexFile.development);

// Give the knex instance to objection.
Model.knex(knex);

//limit the amount o fthe requests on the auth routes
const rateLimit = require("express-rate-limit");
const authlimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 4, // limit each IP to 100 requests per windowMs
});
app.use("/users/login", authlimiter);
app.use("/users/register", authlimiter);
const User = require("./models/Users");
//1.with objection ...
//2.with knex
// app.get("/", async (req, res) => {
//   const addresses = await knex.select().from("addresses");
//   return res.send({ addresses });
// });

/* Set up routes with our server instance */
const playgroundRoute = require("./routes/playground.js");
const usersRoute = require("./routes/users.js");
// only use the custom middleware for the secondpath route
//app.use(playgroundRoute);
app.use(usersRoute);

/* Start the server */
const port = process.env.PORT || 9090;

const server = app.listen(port, (error) => {
  if (error) {
    console.log(port, error);
  }
  console.log("The server is running on port", server.address().port);
});
