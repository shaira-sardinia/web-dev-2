const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const organiserController = require("../controllers/organiserController");

router.get("/", mainController.homepage);

router.get("/about", mainController.about);

router.get("/offers", mainController.offers);

router.get("/team", mainController.team);

module.exports = router;
