const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

router.get("/", mainController.homepage);

router.get("/offers", mainController.offers);

router.get("/team", mainController.team);

module.exports = router;
