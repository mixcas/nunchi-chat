import sanitize from 'sanitize-filename'

export const loadImageUrlAndSizes = (file) => {
  return new Promise((resolve, reject) => {

    // Check if the file is not an image #fail-fast
    if( !file.uploadTaskSnapshot.metadata.contentType.startsWith('image')) {
      resolve(file)
    }

    // Create a new Image element
    const img = new Image()

    // Set the onload callback
    img.onload = event => {
      // Get image dimensions
      const { width, height } = event.target

      // Save dimensions in the file item
      file.width = width
      file.height = height

      // resolve and return the file with the dimensions
      resolve(file)
    }

    img.onerror = () => reject('Error al cargar las dimensiones de la imagen')

    // Add the url as the src of the image
    file.uploadTaskSnapshot.ref.getDownloadURL()
      .then(url => {
        file.previewUrl = img.src = url
      })
      .catch( err => reject(err) )
  })
}

export const getCleanFilename = file => {
  let filename = file.name
  // replace spaces with underscores
  filename = filename.replace(/[.](?=.*[.])/g, '_');
  // replace spaces with underscores
  filename = filename.replace(/ /g,'_')
  // make lowercase
  filename = filename.toLowerCase()
  // sanitize
  filename = sanitize(filename)
  return Date.now() + '-' + filename
}

export const getMediaThumb = (url, width = 324, height = 324) => {
  const filename = url.substring(url.lastIndexOf('/')+1);
  const parts = filename.split('.')
  const thumbFilename = `${parts[0]}_${width}x${height}_thumb.${parts[1]}`

  return url.replace(filename,thumbFilename)
}
