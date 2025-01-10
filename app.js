//# CONFIG EXPRESS:

//* INIT EXPRESS
const express = require("express");
const app = express();

const { APP_HOST, APP_PORT } = process.env;

//* START LISTENING
app.listen(APP_PORT, () => {
  console.log(`Server listening at ${APP_HOST}:${APP_PORT}`);
});
