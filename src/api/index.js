const express = require('express');

const songs = require('./songs');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/songs', songs);

module.exports = router;
