import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setWallets } from '../../reducers/walletsSlice'

import Link from 'next/link'
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
    Object.keys(deployedWallets).forEach(wallet => {
      dispatch(setWallets(wallet))
    })
  }, [account])

  return (
    <div className={styles.drawer__container}>
      <List>
        <ListItem className={styles.listItemBold} disablePadding>
          <Link href="/">
            <ListItemButton>
              <ListItemText primary="Create Wallet" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <Divider/>
      <h4>Wallets</h4>
      <List>
        {wallets.map((wallet, idx) => (
          <ListItem className={styles.listItem} key={idx} disablePadding>
            <Link href={`/${wallet.address}`}>
              <ListItemButton>
                <ListItemText primary={wallet.name} secondary={wallet.address} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  )
};

export default Drawer