const path = require('path')
const fse = require('fs-extra')
const archiver = require('archiver')

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'
process.env.ASSET_PATH = '/'

var webpack = require('webpack'),
  config = require('../webpack.config')

delete config.chromeExtensionBoilerplate

const buildPath = 'build/'
const archivePath = path.resolve(__dirname + '/../extension.zip')

config.mode = 'production'

webpack(config, function (err, stats) {
  if (err) throw err
  zip()
  copy()
})

function zip() {
  // create a file to stream archive data to.
  const output = fse.createWriteStream(archivePath)
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  })

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', function () {
    console.info('Created ' + archivePath + ' (' + (archive.pointer() / 1024 / 1024).toFixed(2) + ' MB)')
  })

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on('end', function () {
    console.info('Data has been drained')
  })

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err
    }
  })

  // good practice to catch this error explicitly
  archive.on('error', function (err) {
    throw err
  })

  // pipe archive data to the file
  archive.pipe(output)

  // append files from a sub-directory, putting its contents at the root of archive
  archive.directory(buildPath, false)

  // finalize the archive (ie we are done appending files but streams have to finish yet)
  // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
  archive.finalize()
}

function copy() {
  fse.copySync(buildPath, dropboxPath, {
    filter: function (src, dest) {
      if (~src.indexOf('hot-update')) {
        return false
      }
      return true
    },
  })
  console.info(`Copied to ${dropboxPath}`)
}
