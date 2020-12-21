const fs = require('fs');
const express = require('express');
const multer = require('multer');

const uploads = multer({ dest: 'uploads/' });

const db = require('../../db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const songs = await db.songs.findMany();

    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
});

router.post('/', uploads.array('songs', 10), async (req, res, next) => {
  try {
    console.log(req.files);
    req.files.forEach((file) => {
      fs.rename(
        `${process.cwd()}/uploads/${file.filename}`,
        `${process.cwd()}/uploads/${file.filename}.mp3`,
        async (err) => {
          if (err) return next(err);
          await db.songs.create({
            data: {
              path: `/uploads/${file.filename}.mp3`,
              title: file.originalname.replace(/.mp3/g, ''),
            },
          });
        }
      );
    });

    return res.sendStatus(201);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
