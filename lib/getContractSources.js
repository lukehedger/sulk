import fs from 'fs-extra'
import path from 'path'

/**
 * Extract contents of contract files as string
 *
 * @param  {Array}  contracts             Contracts to compile
 * @param  {String} inputPath             Directory to read target contracts from
 * @param  {String} contractFileExtension File extension of the target contracts
 * @return {Array}                        Promises resolving contract file content
 */
const getContractSources = (contracts, inputPath, contractFileExtension) => {
  return contracts.map(async contract => {
    try {
      // read contract file content
      const input = await fs.readFileSync(
        path.resolve(`${inputPath}/${contract}.${contractFileExtension}`),
        'utf8'
      )

      // return key/value of contractName.contractFileExtension and file content
      return { [`${contract}.${contractFileExtension}`]: input }
    } catch (error) {
      throw new Error(error)
    }
  })
}

export default getContractSources
