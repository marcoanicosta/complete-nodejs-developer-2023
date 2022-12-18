const path = require('path');


function getMessages(req, res) {
    res.render('messages', {
        title: "Messages to my friends",
        friend: 'Elon Musk'
    })
    //res.sendFile( path.join(__dirname, '..', 'public', 'images', 'skimountain.jpg'))
}

function postMessages(req, res) {
    res.send('Updating Messages');
}

module.exports = {
    getMessages,
    postMessages,
}