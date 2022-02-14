import React, { useEffect, useState } from 'react'

import { ethers } from 'ethers'

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
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const wallet = new ethers.Contract(address, MultiSigWallet.abi, provider)
            setTransactions(await wallet.getTransactions())
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
                                    <TableCell>{ethers.utils.formatEther(transaction.value)}</TableCell>
                                    <TableCell>{transaction.data}</TableCell>
                                    <TableCell>
                                        <Button variant='contained' sx={{ mr: '10px' }}>Approve</Button>
                                        <Button variant='outlined'>Reject</Button>
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