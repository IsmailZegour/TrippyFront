const express = require("express");
const accessRouter = express.Router();
const AccessController = require("../controllers/access.controller");
// Begin Router
accessRouter
    .route('/')
    .get(function (req,resp) {
        resp.render('access/index', {blade: 'login'});
    })
accessRouter
    .route("/register")
    .get(function (req, resp) {
        resp.render('access/index',{blade:'register'});
    })
// end Router
module.exports = accessRouter;
