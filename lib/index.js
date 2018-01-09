import args from 'yargs'
import chalk from 'chalk'
import arrayToObject from './util/arrayToObject.js'
import compileContracts from './compileContracts.js'
import getContractSources from './getContractSources.js'
import processOptions from './processOptions.js'
import outputCompiledContracts from './outputCompiledContracts.js'

/**
 * Sulk 😂
 * Solidity compilation without the tears
 */
;(async () => {
  try {
    const {
      contractFileExtension,
      contracts,
      modulesPath,
      inputPath,
      outputFilename,
      outputPath,
    } = processOptions(args.argv)

    // get the stringified content of all contracts
    const contractSources = await Promise.all(
      getContractSources(
        contracts,
        modulesPath,
        inputPath,
        contractFileExtension
      )
    )

    // do what we came here to do
    const compiledContracts = compileContracts(arrayToObject(contractSources))

    // output compiled contract interfaces
    await outputCompiledContracts(compiledContracts, outputFilename, outputPath)

    // all done
    return console.log(
      chalk.green.bold('\n😂‍   Contracts compiled successfully')
    )
  } catch (error) {
    throw new Error(error)
  }
})()
