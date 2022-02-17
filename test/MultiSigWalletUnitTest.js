const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MultiSigWallet", function () {

  beforeEach(async function () {
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

  describe("Transactions", function () {
    it("Should create a new transaction", async function () {
      await wallet.connect(owner).submit(accounts[0].address, ethers.utils.parseEther("1.5"), "0x");
      const tx = await wallet.transactions(0);
      expect(tx.to).to.be.eq(accounts[0].address);
      expect(tx.value).to.be.eq(ethers.utils.parseEther("1.5"));
      expect(tx.data).to.be.eq("0x");
      expect(tx.status).to.be.eq(0);
    });

    it("Should allow owners to approve or reject a transaction", async function () {
      await wallet.connect(owner).submit(accounts[0].address, ethers.utils.parseEther("1.5"), "0x");
      const tx = await wallet.transactions(0);
      await wallet.connect(owner).approve(0);
      await wallet.connect(accounts[0]).approve(0);
      await wallet.connect(accounts[1]).reject(0);
      expect(await wallet.approval(0, owner.address)).to.be.eq(1);
      expect(await wallet.approval(0, accounts[0].address)).to.be.eq(1);
      expect(await wallet.approval(0, accounts[1].address)).to.be.eq(2);
    });
  });

});
