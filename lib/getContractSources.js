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
      // Check for the file in inputPath directory
      const inputPathExists = await fs.pathExists(
        `${inputPath}/${contract}.${contractFileExtension}`
      )

      if (inputPathExists) {
        // Read contract file content
        const input = fs.readFileSync(
          path.resolve(`${inputPath}/${contract}.${contractFileExtension}`),
          'utf8'
        )

        // Return key/value of contractName.contractFileExtension and file content
        return { [`${contract}.${contractFileExtension}`]: input }
      }

      // File could not be found in CWD, check in user module directories
      return new Promise(resolve =>
        module.paths.map(async modulePath => {
          // Join the path for the current module + passed contract
          const filepath = path.resolve(
            modulePath,
            `${contract}.${contractFileExtension}`
          )

          // Check if the file is present in the current module
          const moduleExists = await fs.pathExists(filepath)

          if (!moduleExists) return

          // Read contract file content
          const input = fs.readFileSync(filepath, 'utf8')

          // Return key/value of contractName.contractFileExtension and file content
          resolve({ [`${contract}.${contractFileExtension}`]: input })
        })
      )
    } catch (error) {
      throw new Error(error)
    }
  })
}

export default getContractSources
