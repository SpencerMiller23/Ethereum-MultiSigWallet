import React, { useState } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

const ConnectWallet = () => {
    const [buttonText, setButtonText] = useState('Connect')
    const [defaultAccount, setDefaultAccount] = useState()
    const [userBalance, setUserBalance] = useState()
    const [error, setError] = useState()

    const connectWalletHandler = async () => {
        try {
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()
            accountChangedHandler(signer)
        } catch (error) {
            setError(error.message)
        }
    }

    const accountChangedHandler = async (signer) => {
        const account = await signer.getAddress()
        setDefaultAccount(account)
        getUserBalance(signer)
    }

    const getUserBalance = async (signer) => {
        const balance = await signer.getBalance()
        setUserBalance(ethers.utils.formatEther(balance))
    }

    return(
        <div>
            <h1>Connect Wallet</h1>
            <button onClick={connectWalletHandler}>{buttonText}</button>
            <h3>{defaultAccount}</h3>
            <h3>{userBalance} ETH</h3>
            <p>{error}</p>
        </div>
    )
};

export default ConnectWallet;
