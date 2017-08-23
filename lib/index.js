const fs = require('fs-extra')
const path = require('path')
const solc = require('solc')
const args = require('yargs').argv
const chalk = require('chalk')

/**
 * Helper to convert Array to Object
 * @param  {Array}  a Array to convert
 * @return {Object}   Converted array
 */
const arrayToObject = a => a.reduce((o, v) => Object.assign({}, o, v), {})

/**
 * Get CLI args
 * @const
 */
const { config } = args

/**
 * Import config options
 * @const opts
 */
const opts = require(path.resolve(config))

/**
 * Process those contracts!
 * @function
 */
const processContracts = async () => {
  try {
    // get the stringified content of all contracts
    const contractSources = await Promise.all(
      getContractSources(opts.contracts)
    )

    // run contracts through Solidity compiler
    const compiledContracts = compile(arrayToObject(contractSources))

    // if `outputPath` is undefined use `inputPath`
    if (!opts.outputPath) opts.outputPath = opts.inputPath

    // write compiled contract interfaces to `opts.outputPath`
    await setContractsInterfaces(compiledContracts)

    // all done
    return console.log(
      chalk.green.bold('\n😂‍   Contracts compiled successfully')
    )
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Extract contents of contracts as string
 * @param  {Object} contracts Contracts to compile
 * @return {Object}           Stringified content of contracts to compile
 */
const getContractSources = contracts => {
  return contracts.map(async contract => {
    try {
      // read contract file content
      const input = await fs.readFileSync(
        path.resolve(`${opts.inputPath}/${contract}.${opts.contractFileExtension}`),
        'utf8'
      )

      return { [`${contract}`]: input }
    } catch (error) {
      throw new Error(error)
    }
  })
}

/**
 * Write compiled contracts interaces to disk
 * @param {Object} contracts Compiled contracts
 */
const setContractsInterfaces = contracts => {
  return fs.outputJson(`${opts.outputPath}/${opts.outputFilename}.json`, contracts, { spaces: 2 })
}

/**
 * Compile a set of one or more contracts
 * @param  {Object} sources   Stringified contracts to compile
 * @return {Object}           Compiled contracts' ABI and bytecode output
 */
const compile = sources => {
  // compile contracts
  const output = solc.compile({ sources }, 1)

  // get compiler output
  const { contracts, errors } = output

  // catch compiler errors
  if (errors) {
    console.log(errors)
    throw new Error(errors[0].message)
  }

  // get `ABI` and `bytecode` from the compiled contract, keyed by contract name
  return arrayToObject(
    Object.keys(contracts).map(contract => ({
      [`${contract.split(':')[1]}`]: {
        abi: JSON.parse(contracts[contract].interface),
        bytecode: contracts[contract].bytecode,
      },
    }))
  )
}

/**
 * Init script
 * @function
 */
const init = (() => processContracts().catch(e => console.error(e)))()
