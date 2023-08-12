// SPDX-License-Identifier: MIT
pragma solidity =0.8.20;

import "openzeppelin-contracts/contracts/access/AccessControl.sol";
import "openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";
import "openzeppelin-contracts/contracts/utils/Strings.sol";
import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";


contract StackRewards is AccessControl, ReentrancyGuard {

    uint256 public taskID = 0; // task ID of the task
    bytes32 public constant EMPLOYER_ROLE = keccak256("EMPLOYER_ROLE"); // role of the employer
    bytes32 public constant EMPLOYEE_ROLE = keccak256("EMPLOYEE_ROLE"); // employee is the role of the employee who is working for the employer.

    mapping(uint256 => uint256) public taskIDtoReward; // taskID to reward
    mapping(uint256 => address) public taskIDtoEmployee; // array of addresses
    mapping(uint256 => bool) public claimedReward; // if the employee has claimed the reward
    mapping(string => bool) public claimedTask; // if the employee has claimed the task
    mapping(uint256 => bool) public approvedTask; // if the employer has approved the task

    constructor(address addr1, address addr2) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        treasury = addr1;
        bstoken = addr2;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /**
     *
     */

    // start of role definitions
    function grantRoleEmployer() public {
        require(
            !hasRole(EMPLOYEE_ROLE, msg.sender),
            "Caller is already an employee"
        );
        _setupRole(EMPLOYER_ROLE, msg.sender);
    }

    function revokeRoleEmployer(address user) public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Caller is not an admin"
        );
        revokeRole(EMPLOYER_ROLE, user);
    }

    function grantRoleContractor() public {
        require(
            !hasRole(EMPLOYER_ROLE, msg.sender),
            "Caller is already an employer"
        );
        _setupRole(EMPLOYEE_ROLE, msg.sender);
    }

    function revokeRoleContractor(address user) public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Caller is not an admin"
        );
        revokeRole(EMPLOYEE_ROLE, user);
    }

    // end of role definitions

    /**
     *
     */

    // main functions
    function createTask(string memory rewardAmount) public {
        require(
            hasRole(EMPLOYER_ROLE, msg.sender),
            "Caller is not an employer"
        );
        taskIDtoReward[taskID] = rewardAmount;
        taskID++;
    }

    function assignTask(string memory _taskID) public {
        require(
            hasRole(EMPLOYEE_ROLE, msg.sender),
            "Caller is not an employee"
        );
        require(
            !claimedTask[append(_taskID, addressToString(msg.sender), "")],
            "Task has already been claimed"
        );
        claimedTask[append(_taskID, addressToString(msg.sender), "")] = true;
        taskIDtoEmployee[_taskID] = (msg.sender);
        
    }

    function approveCompletedTask(
        string memory _taskID,
    ) public {
        require(
            hasRole(EMPLOYEE_ROLE, msg.sender),
            "Caller is not an employee"
        );
        require(
            taskIDtoEmployee[_taskID] != msg.sender,
            "Caller is cannot be the task claimer"
        );
        require(!approvedTask[_taskID], "Task has already been approved");
        approvedTask[_taskID] = true;
    }

    function claimReward(string memory _taskID, address _tokenAddress) public {
        require(
            !claimedReward[_taskID],
            "This task rewards have already been claimed"
        );
        claimedReward[_taskID] = true;
        require(
            hasRole(EMPLOYEE_ROLE, msg.sender),
            "Caller is not an employee"
        );
        require(
            approvedTask[_taskID],
            "Task completion is not approved by a reviewer"
        );

        uint256 amount = taskIDtoReward[_taskID];
        IERC20 token = IERC20(_tokenAddress);

        require(token.transfer(msg.sender, amount), "Transfer failed");

    }

    // Get functions
    function getTokenID(string memory ipfsID) public view returns (uint256) {
        uint256 result;
        for (uint256 j = 0; j <= taskID; j++) {
            if (compareStrings(taskIDtoIPFS[j], ipfsID)) {
                result = j;
            }
        }
        return result;
    }

    function getClaimer(
        string memory _taskID
    ) public view returns (address[] memory) {
        return taskIDtoEmployee[_taskID];
    }

    function getTasks() public view returns (string[] memory) {
        string[] memory result = new string[](taskID);
        for (uint256 j = 0; j <= taskID; j++) {
            if (this.balanceOf(treasury, j) > 0) {
                result[j] = taskIDtoIPFS[j];
            }
        }
        return result;
    }

    // Helper functions
    function compareStrings(
        string memory a,
        string memory b
    ) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    function compareAddr(address a, address b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    function stringToBytes(
        string memory source
    ) internal pure returns (bytes memory result) {
        return abi.encodePacked(source);
    }

    function addressToString(
        address account
    ) public pure returns (string memory) {
        uint256 i = uint256(uint160(address(account)));
        return Strings.toString(i);
    }

    function append(
        string memory a,
        string memory b,
        string memory c
    ) internal pure returns (string memory) {
        return string(abi.encodePacked(a, b, c));
    }

}
