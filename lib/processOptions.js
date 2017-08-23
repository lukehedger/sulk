import path from 'path'

/**
 * Default configuration values
 *
 * @type {Object}
 */
const DEFAULT_CONFIG = {
  contractFileExtension: 'sol',
  outputFilename: 'contracts',
}

/**
 * Process configuration options for the compilation process
 *
 * @param  {Object} options Raw configuration options
 * @return {Object}         Processed configuration options
 */
const processOptions = options => {
  // import config options with `config` filepath argument
  const config = require(path.resolve(options.config))

  // if `outputPath` is undefined use `inputPath`
  if (!config.outputPath) config.outputPath = config.inputPath

  // merge provided config with default config
  return Object.assign({}, DEFAULT_CONFIG, config)
}

export default processOptions
