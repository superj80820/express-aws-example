require('dotenv').config()
const express = require('express')
const multer  = require('multer')
const s3 = require('./s3')

const app = express()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const PORT = process.env.PORT || 3000
const BUCKET_NAME = process.env.BUCKET_NAME
const FILE_NAME = process.env.FILE_NAME

app.post('/s3', upload.single('file'), async function (req, res) {
  try {
    const uploadResponse = await s3.upload(BUCKET_NAME, FILE_NAME, req.file.buffer)
    res.json(uploadResponse)
  } catch(err) {
    res.status(500).send(err.message)
  }
})

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`)
})
