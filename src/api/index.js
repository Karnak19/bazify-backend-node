const express = require('express');

const songs = require('./songs');
const artists = require('./artists');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/songs', songs);
router.use('/artists', artists);

module.exports = router;
