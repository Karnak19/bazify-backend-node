const { Form } = require('multiparty');

const asyncFormParse = (req) =>
  new Promise((resolve, reject) => {
    const form = new Form();
    form.parse(req, async (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

module.exports = {
  asyncFormParse,
};
