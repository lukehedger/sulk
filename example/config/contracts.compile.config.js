const path = require('path')

module.exports = {
  contracts: [
    'Echo.sol',
  ],
  inputPath: path.join(__dirname, '../contracts'),
  outputPath: path.join(__dirname, '../contracts/contracts.json'),
}
