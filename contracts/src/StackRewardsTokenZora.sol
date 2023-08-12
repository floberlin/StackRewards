// SPDX-License-Identifier: MIT
pragma solidity =0.8.20;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract ZoraRewardsToken is ERC20 {
    constructor(uint256 amount) ERC20("RewardsZora", "ZOR") {
        _mint(msg.sender, amount);
    }
}