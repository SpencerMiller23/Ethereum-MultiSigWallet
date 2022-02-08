import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import { Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'

import styles from './Drawer.module.css'

const Drawer = () => {
  const account = useSelector(state => state.wallet.account)
  const [wallets, setWallets] = useState([])

  useEffect(async () => {
    const wallets = await fetch(`/api/wallets/${account}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const walletsJSON = await wallets.json()
    setWallets(walletsJSON)
  }, [account])

  return (
    <div className={styles.drawer__container}>
      <h4>Create Wallet</h4>
      <Divider/>
      <h4>Wallets</h4>
      <List>
        {wallets.map((wallet, idx) => (
          <ListItem className={styles.listItem} key={idx} disablePadding>
            <ListItemButton>
              <ListItemText primary={wallet.name} secondary={wallet.address} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )
};

export default Drawer