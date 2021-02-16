const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    { name: 'action'},
    { name: 'romcom'},
    { name: 'scifi'},
    { name: 'docu-drama'},

]

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre was not found.');
    res.send(genre);
});

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send('Invalid Genre')
})

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(5).required()
    };
    return Joi.validate(genre, schema);
}