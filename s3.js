const AWS = require('aws-sdk')
const stream = require('stream')

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
})

function upload(bucketName, keyName, fileBuffer, options = {
  ACL: 'public-read'
}) {
  return new Promise(function(resolve, reject) {
    let bufferStream = new stream.PassThrough()
    bufferStream.end(fileBuffer)
    bufferStream.once('error', reject)
    s3.upload(
      {
        ACL: options.ACL,
        Bucket: bucketName,
        Key: keyName,
        Body: bufferStream
      },
      function(err, result) {
        if (err) {
          reject(err)
          return
        }
        resolve(result)
      }
    )
  })
}

module.exports = {
  upload
}