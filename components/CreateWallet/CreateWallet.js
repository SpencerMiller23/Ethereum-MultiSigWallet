import React, { useState, useRef } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

import { useDispatch } from 'react-redux'
import { setWallets } from '../../reducers/walletsSlice'

import { Paper, Button, TextField } from '@mui/material'
import { spacing } from '@mui/system'

import styles from './CreateWallet.module.css'

import Factory from '../../artifacts/contracts/Factory.sol/Factory.json'
import { factoryAddress } from '../../config'

const CreateWallet = () => {
    const nameRef = useRef(null)
    const accountRef = useRef(null)
    const requiredRef = useRef(null)
    const [error, setError] = useState()
    const [numAccounts, setNumAccounts] = useState(1)

    const dispatch = useDispatch()

    const createWalletHandler = async () => {
        try {
            const signer = await getSignerAccount()
            let [name, owners, required] = getFormInput()

            const newWalletAddress = await deployNewWallet(factoryAddress, Factory.abi, signer, owners, required)
            submitNewWallet(name, newWalletAddress, owners)
        } catch (e) {
            setError(e.message)
            console.log(error)
        }
    }

    const getSignerAccount = async () => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        return provider.getSigner()
    }

    const getFormInput = () => {
        let owners = []
        const name = nameRef.current.value
        const inputs = accountRef.current.childNodes
        const required = requiredRef.current.value

        if (name === '') {
            throw new Error('Please enter a name for the wallet')
        }

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

        return [name, owners, required]
    }

    const deployNewWallet = async (address, abi, signer, owners, required) => {
        let factory = new ethers.Contract(address, abi, signer)
        let tx = await factory.createWallet(owners, required)
        let receipt = await tx.wait()
        return receipt.events[0].args[0]
    }

    const submitNewWallet = async (walletName, walletAddress, walletOwners) => {
        const body = { walletName, walletAddress, walletOwners }
        await fetch('/api/wallets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        .then(res => {
            if (res.status === 200) {
                dispatch(setWallets({ name: walletName, address: walletAddress }))
            }
        })
    }

    const decrementAccounts = () => {
        if (numAccounts > 1) {
            setNumAccounts(numAccounts - 1)
        }
    }

    return (
        <div>
            <Paper sx={{ backgroundColor: 'light.main', p: '20px' }}>
                <TextField label="Name" variant="outlined" inputRef={nameRef} sx={{ mb: '15px' }} />
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
            </Paper>
        </div>
    )
}

export default CreateWallet
