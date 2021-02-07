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
      res.status(400);
      throw new Error('Please send only 1 file');
    }

    const { path } = files.file[0];

    const {
      common: { album, albumartist, title },
    } = await mm.parseFile(path);

    if (!album || !albumartist || !title) {
      const errorMessage = {
        ...(!album && {
          album: "This audio file doesn't have an album in metadata",
        }),

        ...(!albumartist && {
          albumartist:
            "This audio file doesn't have an albumartist in metadata",
        }),
        ...(!title && {
          title: "This audio file doesn't have a title in metadata",
        }),
      };

      throw new Error(JSON.stringify(errorMessage));
    }

    const buffer = fs.readFileSync(path);
    const duration = await mp3DurationString(buffer);
    const type = await FileType.fromBuffer(buffer);
    const fileName = `${slugify(albumartist)}/${slugify(album)}/${slugify(
      title
    )}`;

    const count = await db.songs.count({
      where: { title },
    });

    if (count !== 0) {
      res.status(400);
      throw new Error('This song already exists');
    }

    const data = await s3UploadFile(buffer, fileName, type);

    // eslint-disable-next-line no-console
    console.log(`Upload to S3 done ! ${fileName}`);

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
    res.status(error.code === 'P2002' ? 400 : res.statusCode || 500);
    return next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const song = await db.songs.update({
      where: {
        id: req.params.id,
      },
      data: {
        duration: req.body.duration,
      },
    });

    res.status(204).json(song);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
