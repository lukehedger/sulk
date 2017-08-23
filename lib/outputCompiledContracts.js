import fs from 'fs-extra'

/**
 * Write compiled contracts interfaces to disk
 *
 * @param  {Object} contracts      Compiled contracts
 * @param  {Object} outputFilename File to write compiled contracts to
 * @param  {Object} outputPath     Directory to write compiled contracts to
 * @return {Promise}
 */
const outputCompiledContracts = (contracts, outputFilename, outputPath) => {
  return fs.outputJson(`${outputPath}/${outputFilename}.json`, contracts, {
    spaces: 2,
  })
}

export default outputCompiledContracts
