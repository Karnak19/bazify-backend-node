const { Form } = require('multiparty');
const mp3Duration = require('mp3-duration');
const bcrypt = require('bcrypt');

const asyncFormParse = (req) =>
  new Promise((resolve, reject) => {
    const form = new Form();
    form.parse(req, async (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

const slugify = (string) => {
  return string.replace(/ /g, '-');
};

const mp3DurationString = (songPath) => {
  return new Promise((resolve, reject) => {
    mp3Duration(songPath, (err, duration) => {
      if (err) reject(err);
      let ceiled = Math.ceil(duration);
      const minutes = Math.floor(ceiled / 60);
      ceiled -= minutes / 60;
      const seconds = parseInt(ceiled % 60, 10);

      resolve(`${minutes}:${seconds}`);
    });
  });
};

const isStringJSONParsable = (string) => {
  try {
    JSON.parse(string);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * @param {string} password plain text password to hash using bcrypt
 * @returns {string} Hashed password
 */
function hashPassword(password) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

/**
 * @param {string} plainPassword plain password to compare
 * @param {string} hashedPassword hashed password to compare (from your db)
 */
function decodePassword(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

module.exports = {
  asyncFormParse,
  slugify,
  mp3DurationString,
  isStringJSONParsable,
  decodePassword,
  hashPassword,
};
