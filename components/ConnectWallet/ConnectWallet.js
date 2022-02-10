import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

import { useSelector, useDispatch } from 'react-redux'
import { setAccount } from '../../reducers/accountSlice'

import Button from '@mui/material/Button';

import styles from './ConnectWallet.module.css'

const ConnectWallet = () => {
    const account = useSelector(state => state.account.account)
    const [error, setError] = useState()

    const dispatch = useDispatch()

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
        dispatch(setAccount({ account }))
    }

    return(
        <div className={styles.connectWallet__container}>
            <p className={styles.address}>{account}</p>
            <Button className={styles.btn} variant="contained" color="light" onClick={connectWalletHandler}>Connect</Button>
        </div>
    )
};

export default ConnectWallet