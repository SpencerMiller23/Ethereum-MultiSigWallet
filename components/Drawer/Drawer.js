import React from 'react'

import { Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'

import styles from './Drawer.module.css'

const Drawer = () => {
  return (
    <div className={styles.drawer__container}>
      <h4>Create Wallet</h4>
      <Divider/>
      <h4>Wallets</h4>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Test" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  )
};

export default Drawer