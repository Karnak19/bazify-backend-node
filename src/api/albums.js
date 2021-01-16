const express = require('express');

const db = require('../../db');

const router = express.Router();

router.put('/:id', async (req, res, next) => {
  try {
    const { title, picture } = req.body;
    const { id } = req.params;

    await db.albums.update({
      where: {
        id,
      },
      data: {
        title,
        picture,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
