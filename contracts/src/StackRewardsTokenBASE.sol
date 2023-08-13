// SPDX-License-Identifier: MIT
pragma solidity =0.8.19;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract RewardsToken is ERC20 {
    constructor(uint256 amount) ERC20("Rewards", "REW") {
        _mint(msg.sender, amount);
    }
}