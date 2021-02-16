const { RSA_PKCS1_OAEP_PADDING } = require('constants');
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

    const genre = {
        id: genres.length + 1;
        name: req.body.name
    };
    genres.push(genre)
    res.send(genre);
})

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(5).required()
    };
    return Joi.validate(genre, schema);
}

//update 
app.put('/api/genres/:id', (req, res) => {
    //look up the genre with the ID
    //if it does not exist, give a 404 error
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre was not found.');

    //validate
    //if invalid, return a 400 bad request
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    //update genres
    genre.name = req.body.name;
    res.send(course);

})