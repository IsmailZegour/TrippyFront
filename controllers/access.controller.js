const CORE_APP_URL = process.env.CORE_APP_URL+':'+process.env.CORE_APP_PORT;
const axios = require('axios').default;
axios.defaults.withCredentials = true;

const AccessController = {
    registerUser: (req,resp,next) => {
        if (req.body.password === req.body.password_confirmation) {
            axios.post(CORE_APP_URL+"/user/register", req.body).then(function (response) {
                req.user = response.data;
                next();
            }).catch(err => {
                resp.send(err);
            });
        } else {
            resp.status(401).send({message: "Passwords don't match"});
        }
    },
    isAuthRestrict: (req,resp,next) => {
        if(req.cookies['userSessionId']){
            axios.get(CORE_APP_URL+'/user/restrict',{headers: {cookie: req.headers.cookie}}).then(function (response) {
                req.user = response.data;
                next();
            }).catch(err => {
                resp.status(401).redirect('/access');
            });
        } else {
            resp.status(401).redirect('/access');
        }
    },
    isAuth: (req,resp,next) => {
        if (req.cookies['userSessionId']){
            axios.get(CORE_APP_URL+'/user/auth',{headers: {cookie: req.headers.cookie}}).then(function(response) {
                req.user = response.data.user;
                next();
            }).catch(err => {
                resp.send(err);
            });
        } else {
            next();
        }
    }
};

module.exports = AccessController;