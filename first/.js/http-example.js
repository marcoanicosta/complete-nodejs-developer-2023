const { get } = require('https'); // destructured using GET function

get('https://www.google.com',(res) => {
    res.on('data', (chunk) => {
        console.log(`Data chunk: ${chunk}`);
    });
    res.on('end', () => {
        console.log(`No more data`);
    });
});
