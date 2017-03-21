// REQUIRE DEPENDENCIES
// ============================================================
const express = require('express'),
    session = require('express-session'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    config = require('./../config');

// INITILIZE APP
// ============================================================
const app = express();
// INITILIZE DEPENDENCIES
// ============================================================
// app.use(cors());
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.secret
}));

app.use(express.static(__dirname + './../dist'));


// CONTROLLERS
// ============================================================
const guideboxCtrl = require('./controllers/guidebox.server.controller');

// ENDPOINTS
// ============================================================
// GUIDEBOX ENDPOINTS
app.get('/api/get-movie-by-title/:title', guideboxCtrl.getMovieByTitle);
app.get('/api/get-movie-by-id/:id', guideboxCtrl.getMovieById);
app.get('/api/get-movie/:title', guideboxCtrl.getMovie);

// VARIABLES
// ============================================================
const port = config.port;
// LISTEN
// ============================================================
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
