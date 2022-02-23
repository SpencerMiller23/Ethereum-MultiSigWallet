import React, { useState, useEffect } from 'react'

import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

import MultiSigWallet from '../../artifacts/contracts/MultiSigWallet.sol/MultiSigWallet.json'

import styles from './History.module.css'

const History = ({ address }) => {
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
              return tx.status === 1 || tx.status === 2
          })
          setTransactions(txs)
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

  return (
    <div>
        <Paper sx={{ backgroundColor: 'light.main' }}>
            <h4 className={styles.heading}>History</h4>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Recipient</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell>{transaction.to}</TableCell>
                      <TableCell>{ethers.utils.formatEther(transaction.value)} ETH</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </Paper>
    </div>
  )
}

export default History