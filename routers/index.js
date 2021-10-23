const express = require("express");
const router = express.Router();
const loginRouter = require("./access.router");
const homepageRouter = require('./homepage.router');
const settingsRouter = require('./settings.router');
const profileRouter = require('./profile.router');

router.use("/access", loginRouter);
router.use('/', homepageRouter);
router.use('/settings', settingsRouter);
router.use('/profile', profileRouter);

module.exports = router;
