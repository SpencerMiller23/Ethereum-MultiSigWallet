import React, { useState, useEffect } from 'react'

import { ethers } from 'ethers'

import { Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

import MultiSigWallet from '../../artifacts/contracts/MultiSigWallet.sol/MultiSigWallet.json'

const Assets = ({ wallet }) => {
    const [balance, setBalance] = useState(0)

    useEffect(async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.web3.currentProvider)
            const ethBalance = await provider.getBalance(wallet)
            setBalance(ethers.utils.formatEther(ethBalance))
        } catch (err) {
            console.log(err)
        }
    })

    return (
        <div>
            <Box sx={{ backgroundColor: 'light.main' }}>
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
            </Box>
        </div>
    )
}

export default Assets