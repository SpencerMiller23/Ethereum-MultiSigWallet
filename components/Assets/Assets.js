import React, { useState, useEffect } from 'react'

import { ethers } from 'ethers'

import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

const Assets = ({ wallet }) => {
    const [balance, setBalance] = useState(0)

    useEffect(async () => {
        if (wallet) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const ethBalance = await provider.getBalance(wallet)
                setBalance(ethers.utils.formatEther(ethBalance))
            } catch (err) {
                console.log(err)
            }
        }
    }, [wallet])

    return (
        <div>
            <Paper sx={{ backgroundColor: 'light.main' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Asset</TableCell>
                                <TableCell>Balance</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Ether</TableCell>
                                <TableCell>{balance} ETH</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}

export default Assets