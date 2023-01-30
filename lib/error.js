const check404 = (resource) => {
  if (!resource){
    const error = new Error
    error.statusCode = 404
    throw error
  } else {
    return resource
  }
}

module.exports = check404