const express = require("express");
const multer = require('multer');
const upload = multer();
const homepageRouter = express.Router();
const UserController = require("../controllers/user.controller");
const AccessController = require('../controllers/access.controller');
const HomeController = require('../controllers/homepage.controller');
const TravelController = require('../controllers/travel.controller');
const DestinationController = require('../controllers/destination.controller');

// Begin Router
homepageRouter
    .route('/authenticate')
    .get(AccessController.isAuthRestrict, function (req, resp, next) {
        resp.redirect('/profile/'+req.user.id);
    });

homepageRouter
    .route('/add-travel')
    .get(AccessController.isAuthRestrict,HomeController.getAddTravel)
    .post(upload.single('picture'),HomeController.addTravel, TravelController.getTravelById, function(req,resp,next) {
        resp.redirect('/add-destination/'+req.travel.id);
    });

homepageRouter
    .route('travel/add-destination/:id')
    .get(AccessController.isAuthRestrict,TravelController.getTravelById, function(req,resp,next) {
        resp.render('index', {blade:'add-destinations', travel: req.travel});
    })

homepageRouter
    .route('/add-destination')
    .get(AccessController.isAuthRestrict, function(req, resp,next) {
        resp.render('index', {blade: 'add-destinations', travel: null});
    })
    .post(UserController.addDestinations)
homepageRouter 
    .route('/conversation/:id')
    .get(UserController.getConversation, function(req,resp,next){
        resp.render('index',{blade:'partials/conversation',user:req.user, conversation: req.conversation});
    })
// end Router
module.exports = homepageRouter;
