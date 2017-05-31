const express = require('express');
const router = express.Router();

// CONTROLLERS
// ============================================================
const guideboxCtrl = require('./../controllers/guidebox.server.controller'),
  suggestionCtrl = require('./../controllers/suggestion.server.controller');

// ENDPOINTS
// ============================================================
// GUIDEBOX ENDPOINTS
router.get('/get-movie-by-title/:title', guideboxCtrl.getMovieByTitle);
router.get('/get-movie-by-id/:id', guideboxCtrl.getMovieById);
router.get('/get-movie/:title', guideboxCtrl.getMovie);

router.get('/movie-suggestions/:search', suggestionCtrl.getSuggestions);

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});


module.exports = router;
