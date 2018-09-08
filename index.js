var DEFAULT_POLICY = 'same-origin'

module.exports = function crossOriginResourcePolicy (options) {
  var headerValue = getHeaderValue(options)

  return function crossOriginResourcePolicy (req, res, next) {
    res.setHeader('Cross-Origin-Resource-Policy', headerValue)
    next()
  }
}

function getHeaderValue (options) {
  options = options || {}

  var value = 'policy' in options ? options.policy : DEFAULT_POLICY

  if ((value !== 'same-origin') && (value !== 'same-site')) {
    throw new Error('Cross-Origin-Resource-Policy must be "same-origin" or "same-site"')
  }

  return value
}
