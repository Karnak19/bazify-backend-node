const express = require('express');

const songs = require('./songs');
const albums = require('./albums');
const playlists = require('./playlists');
const artists = require('./artists');
const { checkToken } = require('../middlewares');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use(checkToken);

router.use('/albums', albums);
router.use('/songs', songs);
router.use('/playlists', playlists);
router.use('/artists', artists);

module.exports = router;
