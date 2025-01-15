const express = require("express");
const router = express.Router();

const moviesController = require("../controllers/moviesController.js");

//# ROTTE MOVIES

//* INDEX

router.get("/", moviesController.index);

//* SHOW

router.get("/:id", moviesController.show);

//* STORE

// Reviews
router.post("/:id/reviews", moviesController.storeReview);

module.exports = router;
