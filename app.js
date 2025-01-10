//# CONFIG EXPRESS:

//* INIT EXPRESS
const express = require("express");
const app = express();
const port = 3000;

//* START LISTENING
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
