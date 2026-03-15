const pathOS = require('path')

const parse = (src) => {
  try {
    return require(src)
  } catch (error) {
    return { error }
  }
}

const config = ({
  path = pathOS.resolve(process.cwd(), '.env.js')
} = {}) => {
  const parsed = parse(path)

  Object.keys(parsed).forEach(key => {
    if (!process.env.hasOwnProperty(key)) {
      process.env[key] = parsed[key]
    }
  })

  return parsed
}

module.exports = {
  config,
  parse
}
