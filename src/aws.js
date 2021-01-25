require('dotenv').config();
const AWS = require('aws-sdk');

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const Bucket = process.env.S3_BUCKET;

AWS.config.update({
  accessKeyId,
  secretAccessKey,
});

const s3 = new AWS.S3();

function s3UploadFile(buffer, name, type) {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  // eslint-disable-next-line no-console
  console.log('starting upload to S3....');
  return s3.upload(params).promise();
}

module.exports = {
  s3,
  s3UploadFile,
  Bucket,
  accessKeyId,
  secretAccessKey,
};
