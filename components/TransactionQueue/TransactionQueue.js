import React, { useEffect, useState } from 'react'

import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

import { Paper, Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

import MultiSigWallet from '../../artifacts/contracts/MultiSigWallet.sol/MultiSigWallet.json'

import styles from './TransactionQueue.module.css'

const TransactionQueue = ({ address }) => {
    const [transactions, setTransactions] = useState([])

    useEffect(async () => {
        if (address) {
            await fetchTransactions()
        }
    }, [address])

    const fetchTransactions = async () => {
        try {
            const signer = await getSignerAccount()
            const wallet = new ethers.Contract(address, MultiSigWallet.abi, signer)
            const txs = (await wallet.getTransactions()).filter(tx => {
                return tx.status === 0
            })
            setTransactions(txs)
        } catch (err) {
            console.log(err)
        }
    }

    const approveTransaction = async (idx) => {
        try {
            const signer = await getSignerAccount()
            const wallet = new ethers.Contract(address, MultiSigWallet.abi, signer)
            await wallet.approve(ethers.BigNumber.from(idx))
        } catch (err) {
            console.log(err)
        }
    }

    const rejectTransaction = async (idx) => {
        try {
            const signer = await getSignerAccount()
            const wallet = new ethers.Contract(address, MultiSigWallet.abi, signer)
            await wallet.reject(ethers.BigNumber.from(idx))
        } catch (err) {
            console.log(err)
        }
    }

    const getSignerAccount = async () => {
        try {
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            return provider.getSigner()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Paper sx={{ backgroundColor: 'light.main', mt: '20px' }}>
                <h4 className={styles.heading}>Pending Transactions</h4>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Recipient</TableCell>
                                <TableCell>Value</TableCell>
                                <TableCell>Calldata</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((transaction, index) => (
                                <TableRow key={index}>
                                    <TableCell>{transaction.to}</TableCell>
                                    <TableCell>{ethers.utils.formatEther(transaction.value)} ETH</TableCell>
                                    <TableCell>{transaction.data}</TableCell>
                                    <TableCell>
                                        <Button variant='contained' sx={{ mr: '10px' }} onClick={() => approveTransaction(transaction.idx)}>Approve</Button>
                                        <Button variant='outlined' onClick={() => rejectTransaction(transaction.idx)}>Reject</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}

export default TransactionQueue