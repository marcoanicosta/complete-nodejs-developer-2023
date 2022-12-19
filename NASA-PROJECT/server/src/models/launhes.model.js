const launches = new Map();

const laucnh = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorere IS1',
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-442 b',
    customer: ['ZTM','NASA'],
    upcoming: true,
    success: true,
}

launches.set(laucnh.flightNumber, launch);


module.exports = {
    launches,
}