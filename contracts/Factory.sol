// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./MultiSigWallet.sol";

contract Factory {
    address[] public wallets;
    mapping(address => uint256) public walletIdMapping;
    uint256 internal nextId = 0;
    MultiSigWallet internal multiSigWallet;

    event WalletCreated(address indexed wallet);

    function createWallet(address[] memory _owners, uint _required) public {
        multiSigWallet = new MultiSigWallet(_owners, _required);
        wallets.push(address(multiSigWallet));
        for (uint i = 0; i < _owners.length; i++) {
            walletIdMapping[_owners[i]] = nextId;
        }
        nextId++;
        emit WalletCreated(address(multiSigWallet));
    }

}