import React, { useEffect } from 'react'

import { ethers } from 'ethers'

import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

import MultiSigWallet from '../../artifacts/contracts/MultiSigWallet.sol/MultiSigWallet.json'

const TransactionQueue = ({ address }) => {

    useEffect(async () => {
        if (address) {
            await fetchTransactions()
        }
    }, [address])

    const fetchTransactions = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.web3.currentProvider)
            const wallet = new ethers.Contract(address, MultiSigWallet.abi, provider)
            const transactions = await wallet.transactions(0)
            console.log(transactions)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Paper sx={{ backgroundColor: 'light.main', mt: '20px' }}>
                <h4>Pending Transactions</h4>
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
                            <TableRow>
                                <TableCell>0x</TableCell>
                                <TableCell>1.0 ETH</TableCell>
                                <TableCell>0x</TableCell>
                                <TableCell>Approve</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}

export default TransactionQueue