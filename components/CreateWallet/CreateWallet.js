import React, { useState, useRef } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

import { Button, Container, TextField } from '@mui/material'
import { Box } from '@mui/system'

import styles from './CreateWallet.module.css'

import Factory from '../../artifacts/contracts/Factory.sol/Factory.json'
import { factoryAddress } from '../../config'

const CreateWallet = () => {
    const accountRef = useRef(null)
    const requiredRef = useRef(null)
    const [error, setError] = useState()

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

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', width: '100%' }}>
            <Container maxWidth='lg'>
                <h4>Create Wallet</h4>
                <TextField label="Account" variant="outlined" inputRef={accountRef} fullWidth />
                <br />
                <TextField label="Required" variant="outlined" inputRef={requiredRef} fullWidth />
                <br />
                <Button variant="contained" color="primary" onClick={createWalletHandler}>Create</Button>
            </Container>
        </Box>
    )
};

export default CreateWallet
