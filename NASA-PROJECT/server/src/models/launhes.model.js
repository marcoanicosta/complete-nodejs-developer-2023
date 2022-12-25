const axios = require('axios');

const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;


const launch = {
    flightNumber: 100, //flight_number
    mission: 'Kepler Exploration X', //name
    rocket: 'Explorere IS1', //rocket.name
    launchDate: new Date('December 27, 2030'), //date_local
    target: 'Kepler-442 b', //N/A
    customers: ['ZTM','NASA'], //payloads.customers
    upcoming: true, //upcoming
    success: true, //success
};

saveLaunch(launch);

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'

async function loadLaunchData() {
    console.log('Downloading launch data...');
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            populate:[
                {
                    path:  "rocket",
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        'customers': 1
                    }
                },
            ]
        } 
    });
}


async function existsLaunchWithId(launchId) {
    return await launchesDatabase.findOne({
        flightNumber: launchId,
    });
};

async function getLatestFlightNumber(){
    const latestLaucnh = await launchesDatabase
        .findOne({})
        .sort('-flightNumber');

    if(!latestLaucnh) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaucnh.flightNumber;
}

async function getAllLaunches(){
    return await launchesDatabase.find({}, {'_id': 0, '__v':0})
};

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target
    });

    if(!planet) {
        throw new Error('No matching planet found')
    }

    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    });
};

async function scheduleNewLaunch(launch) {
    const newflightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero To Mastery', 'NASA'],
        flightNumber: newflightNumber,
    });

    await saveLaunch(newLaunch);
}


async function abortLaunchById(launchId) {
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    });
    return aborted.modifiedCount === 1;
};

module.exports = {
    loadLaunchData,
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById,
};