const express = require("express");
const router = express.Router();

const moviesController = require("../controllers/moviesController.js");

//# ROTTE MOVIES

//* INDEX

router.get("/", moviesController.index);

module.exports = router;
