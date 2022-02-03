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

    const createWalletHandler = async () => {
        try {
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()

            let owners = []
            let inputs = accountRef.current.childNodes
            let required = requiredRef.current.value

            if (required < 1 || required > numAccounts || required === "") {
                throw new Error('Required number of accounts must be between 1 and the number of accounts')
            }

            for (let i = 0; i < inputs.length; i++) {
                let inputValue = inputs[i].childNodes[1].childNodes[0].value
                if (inputValue !== "") {
                    owners.push(inputValue)
                } else {
                    throw new Error('Please remove any blank accounts')
                }
            }
            
            let factory = new ethers.Contract(factoryAddress, Factory.abi, signer)
            let tx = await factory.createWallet(owners, requiredRef.current.value)
            let receipt = await tx.wait()
            console.log(receipt)
        } catch (e) {
            setError(e.message)
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
