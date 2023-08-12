// SPDX-License-Identifier: MIT
pragma solidity =0.8.20;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract OPRewardsToken is ERC20 {
    constructor(uint256 amount) ERC20("RewardsOP", "OPR") {
        _mint(msg.sender, amount);
    }
}