const express = require('express');

const songs = require('./songs');
const albums = require('./albums');
const artists = require('./artists');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/albums', albums);
router.use('/songs', songs);
router.use('/artists', artists);

module.exports = router;
