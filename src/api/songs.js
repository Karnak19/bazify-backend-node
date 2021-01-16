const fs = require('fs');
const express = require('express');
const mm = require('music-metadata');
const FileType = require('file-type');
const { s3UploadFile } = require('../aws');
const { asyncFormParse } = require('../util');
const db = require('../../db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const songs = await db.songs.findMany({
      include: {
        artist: true,
      },
    });

    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { files } = await asyncFormParse(req);
    const path = files.file[0].path;
    const {
      common: { album, albumartist, title },
    } = await mm.parseFile(path);

    const buffer = fs.readFileSync(path);
    const type = await FileType.fromBuffer(buffer);
    const fileName = `${Date.now().toString()}`;
    const data = await s3UploadFile(buffer, fileName, type);

    const newSong = await db.songs.create({
      data: {
        title,
        s3_link: data.Location,
        album: {
          connectOrCreate: {
            create: {
              title: album,
              artist: {
                connect: {
                  name: albumartist,
                },
              },
            },
            where: {
              title: album,
            },
          },
        },
        artist: {
          connectOrCreate: {
            create: {
              name: albumartist,
            },
            where: {
              name: albumartist,
            },
          },
        },
      },
    });
    return res.status(201).send(newSong);
  } catch (error) {
    onsole.error(error);
    res.status(error.statusCode || 500);
    return next(error);
  }
});

module.exports = router;
