require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { decodePassword, hashPassword } = require('./util');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  const { pseudo, password } = req.body;

  try {
    const user = await db.users.findUnique({
      where: {
        pseudo,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isValid = decodePassword(password, user.password);

    if (isValid) {
      delete user.password;

      const token = jwt.sign(
        {
          username: user.pseudo,
        },
        process.env.SECRET,
        {
          expiresIn: '24h',
        }
      );
      res.status(200).json({
        token,
        user,
      });
    } else {
      throw new Error('Invalid password');
    }
  } catch (error) {
    res.status(422);
    next(error);
  }
});

router.post('/register', async (req, res, next) => {
  const { pseudo, password } = req.body;

  try {
    const user = await db.users.create({
      data: {
        pseudo,
        password: hashPassword(password),
      },
    });
    if (user) {
      res.sendStatus(204);
    } else {
      res.status(400).json({
        message: 'User already exists',
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
