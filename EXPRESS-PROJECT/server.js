const express = require('express');

const app = express();

const PORT = 3000;


app.get('/', (req, res) => {
    res.send('heeelooooo');
})
app.get('/messages', (req, res) => {
    res.send({
        id: 1,
        name: 'Isaac Netwon'
    })
})
app.post('/messages', (req, res) => {
    res.send('Updating Messages');
})

app.listen(PORT, () => {
    console.log(`Listeing on port ${PORT}... 📟`);
})