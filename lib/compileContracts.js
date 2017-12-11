import solc from 'solc'
import chalk from 'chalk'
import arrayToObject from './util/arrayToObject.js'

/**
 * Compile a set of one or more contracts
 *
 * @example compileContracts({ 'Echo.sol': 'pragma solidity ^0.4.15; contract Echo {}' })
 *
 * @param  {Object} sources Stringified contracts to compile
 * @return {Object}         Compiled contracts' ABI and bytecode output
 */
const compileContracts = sources => {
  // compile contracts
  const output = solc.compile({ sources }, 1)

  // get compiler output
  const { contracts, errors } = output

  // catch compiler errors
  if (errors) {
    // Loop over each error to check of its type; error || warning
    errors.map(item => {
      // Regex condition
      const warningRegex = new RegExp('Warning:')

      // Check if the error item is just a warning
      if (warningRegex.test(item)) {
        console.info(
          chalk.yellow(`⚠️  [WARNING] ⚠️: ${item.replace(/ Warning:/g, '')}`)
        )
      } else {
        // return the error to console
        console.error(chalk.red.bold(item))
      }
    })
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

export default compileContracts
