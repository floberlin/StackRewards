// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract ERC20TokenFactoryOP {
    event TokenCreated(
        address indexed tokenAddress,
        string name,
        string symbol,
        uint256 initialSupply
    );

    function createToken(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) external {
        ERC20 newToken = new ERC20(name, symbol);
        newToken._mint(msg.sender, initialSupply);
        emit TokenCreated(address(newToken), name, symbol, initialSupply);
    }
}
