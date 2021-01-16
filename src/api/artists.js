const express = require('express');
const db = require('../../db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const artists = await db.artists.findMany();

    res.status(200).json(artists);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const artists = await db.artists.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(artists);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/songs', async (req, res, next) => {
  const { id } = req.params;
  try {
    const s = await db.artists.findUnique({
      where: {
        id,
      },
      include: {
        songs: true,
      },
    });

    res.status(200).json(s);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/albums', async (req, res, next) => {
  const { id } = req.params;
  try {
    const s = await db.artists.findUnique({
      where: {
        id,
      },
      include: {
        albums: true,
      },
    });

    res.status(200).json(s);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { name, picture } = req.body;
  try {
    const newArtist = await db.artists.create({
      data: {
        name,
        picture,
      },
    });
    return res.status(201).send(newArtist);
  } catch (error) {
    onsole.error(error);
    res.status(error.statusCode || 500);
    return next(error);
  }
});

module.exports = router;
