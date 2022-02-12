import React, { useRef } from 'react'

import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

import { Paper, TextField, Button } from '@mui/material'

import styles from './CreateTransaction.module.css'

import MultiSigWallet from '../../artifacts/contracts/MultiSigWallet.sol/MultiSigWallet.json'

const CreateTransaction = ({ address }) => {
  const recipientRef = useRef(null)
  const valueRef = useRef(null)
  const dataRef = useRef(null)

  const submitTransactionHandler = async () => {
    try {
      const signer = await getSignerAccount()
      const [recipient, value, data] = getFormInput()
      const txReceipt = await submitTransaction(signer, address, MultiSigWallet.abi, recipient, value, data)
      console.log(txReceipt)
      clearInputs()
    } catch (err) {
      console.log(err)
    }
  }

  const getSignerAccount = async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    return provider.getSigner()
  }

  const getFormInput = () => {
    const recipient = recipientRef.current.value
    const value = valueRef.current.value
    const data = dataRef.current.value
    return [recipient, value, data]
  }

  const submitTransaction = async (signer, addr, abi, recipient, value, calldata) => {
    const wallet = new ethers.Contract(addr, abi, signer)
    const tx = await wallet.submit(recipient, value, calldata)
    const receipt = await tx.wait()
    return receipt.events[0].args[0]
  }

  const clearInputs = () => {
    recipientRef.current.value = ''
    valueRef.current.value = ''
    dataRef.current.value = ''
  }

  return (
    <div>
        <Paper sx={{ backgroundColor: 'light.main', p: '20px', mt: '20px' }}>
            <h4 className={styles.heading}>New Transaction</h4>
            <TextField label="Recipient" variant="outlined" inputRef={recipientRef} sx={{ mb: '15px' }} fullWidth />
            <br />
            <TextField label="Value" variant="outlined" inputRef={valueRef} sx={{ mb: '15px' }} fullWidth />
            <br />
            <TextField label="Calldata" variant="outlined" inputRef={dataRef} sx={{ mb: '15px' }} fullWidth />
            <br />
            <Button variant="contained" color="primary" onClick={submitTransactionHandler}>Submit</Button>
        </Paper>
    </div>
  )
}

export default CreateTransaction