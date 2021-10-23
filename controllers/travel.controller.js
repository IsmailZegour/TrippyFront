const CORE_APP_URL = process.env.CORE_APP_URL+':'+process.env.CORE_APP_PORT;
const axios = require('axios').default;

const TravelController = {
    getTravelDestinationsCount: (req,resp,next) => {
        let travel_id = req.travel.id || req.body.travel.id;
        axios.get(CORE_APP_URL+'/travel/destination/'+travel_id).then((response) => {
            req.travel.destinationsCount = response.data;
            next();
        }).catch(err => resp.send(err));
    },
    getTravelActivitiesCount: (req,resp,next) => {
        let travel_id = req.travel.id || req.body.travel.id;
        xios.get(CORE_APP_URL+'/travel/activity/'+travel_id).then((reponse) => {
            req.travel.activitiesCount = response.data;
            next();
        }).catch(err => resp.send(err));
    },
    getTravelPostsCount: (req,resp,next) => {
        let travel_id = req.travel.id || req.body.travel.id;
        axios.get(CORE_APP_URL+'/travel/post/'+travel_id).then((response) => {
            req.travel.postsCount = response.data;
            next();
        }).catch(err => resp.send(err));
    },
    getTravelById: (req,resp,next) => {
        let travel_id = req.params.id;
        axios.get(CORE_APP_URL+'/travel/'+travel_id).then(response => {
            req.travel = response.data;
            next();
        }).catch(err => {resp.send(err)});
    }
}

module.exports = TravelController;