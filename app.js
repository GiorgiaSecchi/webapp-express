//# INIT EXPRESS
const express = require("express");
const cors = require("cors");
const app = express();
const { APP_HOST, APP_PORT } = process.env;

// # CORS CONFIG
var corsOptions = {
  origin: "http://localhost:5173",
  optionSuccessStatus: 200,
};

//# REGISTERING MIDDLEWARES

// Body-parser for body request (json)
app.use(express.json());
// Serving public folder (assets static)
app.use(express.static("public"));
// Abilita CORS per il front-end
app.use(cors(corsOptions));

//# REGISTERING ROUTERS
// Import routers
const moviesRouter = require("./routers/moviesRouter");
// Setting routers
app.use("/api/movies", moviesRouter);

//# ERROR HANDLERS (dopo le routers)
const notFound = require("./middlewares/notFound");
const errorsHandler = require("./middlewares/errorsHandler");

app.use(notFound);
app.use(errorsHandler);

//# START LISTENING
app.listen(APP_PORT, () => {
  console.log(`Server listening at ${APP_HOST}:${APP_PORT}`);
});
