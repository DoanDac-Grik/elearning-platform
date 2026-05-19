const express = require('express');
const router = express.Router();
const displayUser  = require("../../middleware/displayUser");

const siteController = require('../../app/controllers/SiteController');

router.use('/', displayUser, siteController.index);

module.exports = router;
