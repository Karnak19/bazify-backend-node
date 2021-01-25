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

    const multipleFilesUpload = files.file.map(async ({ path }) => {
      const {
        common: { album, albumartist, title },
      } = await mm.parseFile(path);

      const buffer = fs.readFileSync(path);
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

      return s3UploadFile(buffer, fileName, type);
    });
    const s3Response = await Promise.all(multipleFilesUpload);
    // eslint-disable-next-line no-console
    console.log(`Upload to S3 done !`);
    console.log(s3Response);

    const dbCreateSongs = s3Response.map(async ({ Location }, i) => {
      const { path } = files.file[i];
      const {
        common: { album, albumartist, title },
      } = await mm.parseFile(path);
      const buffer = fs.readFileSync(path);

      const duration = await mp3DurationString(buffer);

      return db.songs.create({
        data: {
          title,
          duration,
          s3_link: Location,
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
    });

    const createdSongs = await Promise.all(dbCreateSongs);

    // const newSong = await db.songs.create({
    //   data: {
    //     title,
    //     duration,
    //     s3_link: data.Location,
    //     album: {
    //       connectOrCreate: {
    //         create: {
    //           title: album,
    //           artist: {
    //             connect: {
    //               name: albumartist,
    //             },
    //           },
    //         },
    //         where: {
    //           title: album,
    //         },
    //       },
    //     },
    //     artist: {
    //       connectOrCreate: {
    //         create: {
    //           name: albumartist,
    //         },
    //         where: {
    //           name: albumartist,
    //         },
    //       },
    //     },
    //   },
    // });

    return res.status(201).json(createdSongs || {});
  } catch (error) {
    res.status(error.code === 'P2002' ? 400 : res.statusCode || 500);
    return next(error);
  }
});

module.exports = router;
