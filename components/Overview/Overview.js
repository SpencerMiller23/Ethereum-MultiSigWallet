import React from 'react'

import { Link, Paper } from '@mui/material'

import styles from './Overview.module.css'

const Overview = () => {
  return (
    <div>
        <Paper sx={{ backgroundColor: 'light.main', p: '20px', mt: '20px' }}>
            <h4 className={styles.heading}>Disclaimer</h4>
            <p>This project is for demonstration purposes only and I do can not guarantee the security of the smart contract.</p>
            <h4 className={styles.heading}>How it works</h4>
            <p>A multi-signature wallet is a cryptocurrency wallet that requires multiple signatures from multiple owners to perform a transaction.</p>
            <p>These types of wallets help to mitigate security concerns that come with a signle private key mechanism.</p>
            <p>Create a new multi-signature wallet by giving it a memorable name, and filling in the addresses of any number of owners along with the number of required signatures.</p>
            <h4 className={styles.heading}>How to use</h4>
            <p>Set up a new wallet (ex: <Link href='https://metamask.io/' target="_blank" underline='always'>Metamask</Link>)</p>
            <p>Follow <Link href='https://devtonight.com/posts/metamask-testnet-wallet-setup-for-blockchain-development' target="_blank" underline='always'>this guide</Link> to set up your wallet and switch to the Rinkeby Test Network.</p>
            <p>Send yourself some test ETH <Link href='https://faucets.chain.link/rinkeby' target="_blank" underline='always'>here</Link></p>
        </Paper>
    </div>
  )
}

export default Overview