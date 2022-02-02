import React, { useState, useRef } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

import { Button, Container, TextField } from '@mui/material'
import { Box, spacing } from '@mui/system'

import styles from './CreateWallet.module.css'

import Factory from '../../artifacts/contracts/Factory.sol/Factory.json'
import { factoryAddress } from '../../config'

const CreateWallet = () => {
    const accountRef = useRef(null)
    const requiredRef = useRef(null)
    const [error, setError] = useState()
    const [numAccounts, setNumAccounts] = useState(1)

    // TODO: Enable creating a wallet with multiple accounts
    const createWalletHandler = async () => {
        try {
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()

            let factory = new ethers.Contract(factoryAddress, Factory.abi, signer)
            let tx = await factory.createWallet([accountRef.current.value], requiredRef.current.value)
            let receipt = await tx.wait()
        } catch (error) {
            setError(error.message)
            console.log(error)
        }
    }

    const decrementAccounts = () => {
        if (numAccounts > 1)
            setNumAccounts(numAccounts - 1)
    }

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', width: '100%' }}>
            <Container maxWidth='lg'>
                <h4>Create Wallet</h4>
                <div className={styles.form__top} ref={accountRef}>
                    {Array.from(Array(numAccounts)).map((_, i) => (
                        <TextField
                            sx={{ mb: '15px' }}
                            key={i}
                            label={`Account #${i + 1}`}
                            variant="outlined"
                        />
                    ))}
                </div>
                <div className={styles.button__container}>
                    <Button variant="outlined" color="primary" onClick={decrementAccounts}>Remove owner</Button>
                    <Button variant="contained" color="primary" onClick={() => setNumAccounts(numAccounts + 1)}>Add owner</Button>
                </div>
                <div className={styles.form__bottom}>
                    <TextField label="Required" variant="outlined" inputRef={requiredRef} />
                    <Button variant="contained" color="primary" onClick={createWalletHandler}>Create wallet</Button>
                </div>
            </Container>
        </Box>
    )
};

export default CreateWallet
