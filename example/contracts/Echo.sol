pragma solidity ^0.4.18;

contract Echo {
  event Echoed(uint echoValue);

  function echo(uint _value) public returns (uint) {
    Echoed(_value);

    return _value;
  }
}
