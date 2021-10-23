const CORE_APP_URL = process.env.CORE_APP_URL+':'+process.env.CORE_APP_PORT;
const axios = require('axios').default;
axios.defaults.withCredentials = true;
const HomeController = {
    getHomePage: async (req,resp,next) => {
        resp.render('index', {blade: 'homepage'});
    },
    getAddTravel: async (req,resp,next) => {
        resp.render('index', {blade: 'add-travel'});
    },
    addTravel: async (req,resp,next) => {
        req.body.picture = req.file;
        axios.post(CORE_APP_URL+'/travel',req.body,{headers: {cookie: req.headers.cookie}}).then((response)=>{
            req.travel=response.data;
            next();
        }).catch(err => {resp.status(401).redirect('/access');})
    }
}

module.exports = HomeController;