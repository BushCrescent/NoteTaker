const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

//create server and port
const app = express();
const PORT = 8080;

//set up body parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//public asset access
app.use(express.static('public'));

//add the routes
app.use(apiRoutes);
app.use(htmlRoutes);

//turn on the server and
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});