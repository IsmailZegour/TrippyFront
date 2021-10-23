const express = require('express');
const profileRouter = express.Router();
const UserController = require('../controllers/user.controller');

profileRouter
    .route('/:id')
    .get(UserController.getProfile, UserController.getRelation, function (req,resp,next) {
        resp.render('index',{ blade: 'profile',profile: req.profile, relation:req.relation})
    })
profileRouter
    .route('/travels/:id')
    .get(UserController.getTravels, function (req,resp,next) {
        resp.render('partials/profile-content',{profile: req.travels});
    })
profileRouter
    .route('/destinations/:id')
    .get(UserController.getDestinations, function (req,resp,next) {
        resp.render('partials/profile-content',{profile: req.posts});
    })
profileRouter
    .route('/activities/:id')
    .get(UserController.getActivities, function (req,resp,next) {
        resp.render('partials/profile-content',{profile: req.activities});
    })
profileRouter
    .route('/posts/:id')
    .get(UserController.getPosts, function (req,resp,next) {
        resp.render('partials/profile-content',{profile: req.posts});
    })
profileRouter
    .route('/follow/:id')
    .get(UserController.follow);
profileRouter
    .route('/unfollow/:id')
    .get(UserController.unfollow);
profileRouter
    .route('/messages')
    .get(UserController.getConversations);

module.exports = profileRouter;