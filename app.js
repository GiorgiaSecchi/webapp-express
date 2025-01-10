//# INIT EXPRESS
const express = require("express");
const app = express();
const { APP_HOST, APP_PORT } = process.env;

//# REGISTERING MIDDLEWARES
// SERVING PUBLIC FOLDER (assets statici)
app.use(express.static("public"));

//# REGISTERING ROUTERS
// import routers
const moviesRouter = require("./routers/moviesRouter");
// setting routers
app.use("/movies", moviesRouter);

//# START LISTENING
app.listen(APP_PORT, () => {
  console.log(`Server listening at ${APP_HOST}:${APP_PORT}`);
});
