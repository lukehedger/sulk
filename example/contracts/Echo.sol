pragma solidity ^0.4.15;

contract Echo {
  event Echoed(uint echoValue);

  function echo(uint _value) constant returns (uint) {
    Echoed(_value);

    return _value;
  }
}
