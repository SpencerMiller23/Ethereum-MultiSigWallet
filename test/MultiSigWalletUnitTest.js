const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MultiSigWallet", function () {

  beforeEach(async function () {
    // Deploy the contract
    Contract = await ethers.getContractFactory("MultiSigWallet");
    [owner, ...accounts] = await ethers.getSigners();
    wallet = await Contract.deploy([owner.address, accounts[0].address, accounts[1].address], 2);
  });

  describe("Deployment", function () {
    it("Set owners properly", async function () {
      expect(await wallet.isOwner(owner.address)).to.be.true;
      expect(await wallet.isOwner(accounts[0].address)).to.be.true;
      expect(await wallet.isOwner(accounts[1].address)).to.be.true;
      expect(await wallet.isOwner(accounts[2].address)).to.be.false;
    });

    it("Set required signatures properly", async function () {
      expect(await wallet.required()).to.be.eq(2);
    });
  });

  describe("Receive", function () {
    it("Return balance", async function () {
      await owner.sendTransaction({
        to: wallet.address,
        value: ethers.utils.parseEther("1.5"),
      });

      expect(await ethers.provider.getBalance(wallet.address)).to.be.eq(ethers.utils.parseEther("1.5"));
    });
  });

});
