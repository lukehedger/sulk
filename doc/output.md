# Output

Sulk generates a single JSON file containing the compiled Solidity output for
each contract:

```json
{
  "Echo": {
    "abi": [],
    "bytecode": ""
  },
  "Ownable": {
    "abi": [],
    "bytecode": ""
  }
}
```

See: https://solidity.readthedocs.io/en/develop/abi-spec.html

## Usage

The compiled contracts JSON file can then be used to instantiate contracts with
a library like
[`web3.js`](http://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#options-jsoninterface):

```js
import contracts from './contracts.json'

const Echo = new web3.eth.Contract(contracts.Echo.abi)
```
