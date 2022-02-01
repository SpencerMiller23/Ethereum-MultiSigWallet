import React, { useState } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

import Button from '@mui/material/Button';

const ConnectWallet = () => {
    const [account, setAccount] = useState()
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
        setAccount(account)
        getUserBalance(signer)
    }

    const getUserBalance = async (signer) => {
        const balance = await signer.getBalance()
        setUserBalance(ethers.utils.formatEther(balance))
    }

    return(
        <div>
            <div>
                <h3>{account}</h3>
                <Button variant="contained" onClick={connectWalletHandler}>Connect</Button>
            </div>
        </div>
    )
};

export default ConnectWallet