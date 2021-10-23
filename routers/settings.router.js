const express = require("express");
const settingsRouter = express.Router();
const AccessController = require('../controllers/access.controller');

// Begin Router
settingsRouter
    .route('/')
    .get(AccessController.isAuthRestrict,function (req,resp) {
        resp.render('settings');
    })
// end Router
module.exports = settingsRouter;
