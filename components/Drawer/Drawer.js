import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setWallets } from '../../reducers/walletsSlice'

import { Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'

import styles from './Drawer.module.css'

const Drawer = () => {
  const account = useSelector(state => state.account.account)
  const wallets = useSelector(state => state.wallets.wallets)

  const dispatch = useDispatch()

  useEffect(async () => {
    const deployedWallets = await fetch(`/api/wallets/${account}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const walletsJSON = await deployedWallets.json()
    walletsJSON.forEach(wallet => {
      console.log(wallet)
      dispatch(setWallets(wallet))
    })
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