const { launches } = require('../../models/launhes.model')

function httpGetAllLaunches (req, res) {
    return res.status(200).json(getAllLaunches());
};

module.exports = { 
    httpGetAllLaunches,
};