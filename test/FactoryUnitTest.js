const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Factory", function () {
    it("Deploy Factory contract", async function() {
        Factory = await ethers.getContractFactory("Factory");
        factory = await Factory.deploy();
        await factory.deployed();
        expect(factory.address).not.to.be.null;
    });

    it("Deploy MultiSigWallet contract", async function() {
        const [owner, ...accounts] = await ethers.getSigners();
        await factory.createWallet([owner.address, accounts[0].address], 2);
        await expect(factory.wallets(1)).not.to.be.null;
    });
});