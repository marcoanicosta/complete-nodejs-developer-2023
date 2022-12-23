const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;


const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorere IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM','NASA'],
    upcoming: true,
    success: true,
};

saveLaunch(launch);


function existsLaunchWithId(launchId) {
    return launches.has(launchId);
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

    await launchesDatabase.updateOne({
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


function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
};

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById,
};