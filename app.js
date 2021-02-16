const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    { name: 'action'},
    { name: 'romcom'},
    { name: 'scifi'},
    { name: 'docu-drama'},

]

app.get('/', (req, res) => {
    res.send('Hello World!!');
});