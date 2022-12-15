const EventEmitter = require('events');

const celebrity = new EventEmitter();

//Subscribe to celebrity
celebrity.on('race', (result) => {
    if (result === 'win') {
        console.log('Congratulations! You are the best');
    }
    
});

celebrity.on('race', (result) => {
    if (result === 'win') {
        console.log('Boo!I could have done better');
    }
});

process.on('exit', (code) => {
    console.log('Process exit event with code: 📟', code);
  });

celebrity.emit('race', 'win');
celebrity.emit('race', 'lost');