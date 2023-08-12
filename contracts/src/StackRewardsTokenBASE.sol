// SPDX-License-Identifier: MIT
pragma solidity =0.8.20;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract BASERewardsToken is ERC20 {
    constructor(uint256 amount) ERC20("RewardsBase", "BAR") {
        _mint(msg.sender, amount);
    }
}