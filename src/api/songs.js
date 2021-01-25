const fs = require('fs');
const express = require('express');
const mm = require('music-metadata');
const FileType = require('file-type');

const { s3UploadFile } = require('../aws');
const { asyncFormParse, slugify, mp3DurationString } = require('../util');
const db = require('../../db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const songs = await db.songs.findMany({
      select: {
        id: true,
        title: true,
        duration: true,
        s3_link: true,
        artist: {
          select: {
            name: true,
            picture: true,
          },
        },
        album: {
          select: {
            title: true,
            picture: true,
          },
        },
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

    if (files.file.length > 1) {
      throw new Error('Please send only 1 file');
    }

    const { path } = files.file[0];

    const {
      common: { album, albumartist, title },
    } = await mm.parseFile(path);

    const buffer = fs.readFileSync(path);
    const duration = await mp3DurationString(buffer);
    const type = await FileType.fromBuffer(buffer);
    const fileName = `${albumartist}/${slugify(album)}/${slugify(title)}`;

    const data = await s3UploadFile(buffer, fileName, type);

    const newSong = await db.songs.create({
      data: {
        title,
        duration,
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

    return res.status(201).json(newSong);
  } catch (error) {
    res.status(error.statusCode || 500);
    return next(error);
  }
});

module.exports = router;
