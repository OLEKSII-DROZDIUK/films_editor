const express = require('express');
const router = express.Router();

const { getAllFilms, loadNewFilms, delFilm, addFilm} = require('../controllers/films');

router.get('/get', getAllFilms);
router.delete('/delete', delFilm);
router.post('/add', addFilm);
router.post('/load', loadNewFilms);

module.exports = router;