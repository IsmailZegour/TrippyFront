const CORE_APP_URL = process.env.CORE_APP_URL+':'+process.env.CORE_APP_PORT;
const axios = require('axios').default;
axios.defaults.withCredentials = true;

const UserController = {
    getTravels: (req,resp,next) => {
        let user_id = req.params.id;
        axios.get(CORE_APP_URL+'/user/travels/'+user_id).then(function (response) {
            req.travels = response.data;
            next();
        }).catch(err => {
            resp.send(err);
        });
    },
    getTravelById: (req,resp,next) => {
        let travel_id = req.params.travel_id;
        axios.get(CORE_APP_URL+'/travel/'+travel_id).then(function (response) {
            req.travel = response.data;
            next();
        }).catch(err => {
            resp.send(err);
        });
    },
    getPosts: (req,resp,next) => {
        let user_id = req.params.id;
        axios.get(CORE_APP_URL+'/user/posts/'+user_id).then(function (response) {
            req.posts = response.data;
            next();
        }).catch(err => {resp.send(err)})
    },
    getDestinations: (req,resp,next) => {
        let user_id = req.params.id;
        axios.get(CORE_APP_URL+'/destinations/'+user_id).then(function (response) {
            req.destinations = response.data;
            next();
        }).catch(err => {
            resp.status(err.response.status).send(err.response.message);
        });
    },
    getActivities: (req,resp,next) => {
        let user_id = req.params.id;
        axios.get(CORE_APP_URL+'/activities/'+user_id).then(function (response) {
            req.activites = response.data;
            next();
        }).catch(err => {
            resp.status(err.response.status).send(err.response.message);
        });
    },
    getProfile: (req,resp,next) => {
        let user_id = req.params.id;
        axios.get(CORE_APP_URL+'/user/profile/'+user_id).then(function (response) {
            req.profile = response.data;
            next();
        }).catch(err => {
            resp.send(err);
        });
    },
    getRelation: (req,resp,next)=> {
        let user_id = req.params.id;
        axios.get(CORE_APP_URL+'/user/relation/'+user_id, {headers: {cookie: req.headers.cookie}}).then(response => {
            req.relation = response.data;
            next();
        }).catch(err => {resp.send(err)});
    },
    follow: (req,resp,next) => {
        let targer_id = req.params.id;
        axios.post(CORE_APP_URL+'/user/follow').then(response => {

        }).catch(err => {
            resp.send(err);
        })
    },
    unfollow: (req,resp,next) => {
        let target_id = req.params.id;
        axios.get(CORE_APP_URL+'/user/unfollow', {headers: {cookie: req.headers.cookie}}).then(reponse => {
            req.relation = response.data;
            next();
        }).catch(err => {
            resp.send(err);
        })
    },
    addDestinations: (req,resp,next) => {
        console.log(req.body);
    },
    getConversations: (req,resp,next) => {
        axios.get(CORE_APP_URL+'/user/messages',{headers: {cookie: req.headers.cookie}}).then(response=>{
            req.conversations = response.data;
            next();
        }).catch(err => {
            resp.send(err);
        })
    },
    getConversation: (req,resp,next) => {
        axios.get(CORE_APP_URL+'/chat/conversation/'+req.params.id,{headers: {cookie: req.headers.cookie}}).then(response=>{
            req.conversation = response.data.conversation[0];
            req.user=response.data.user;
            next();
        }).catch(err => {
            resp.send(err);
        })
    }
}

module.exports = UserController;