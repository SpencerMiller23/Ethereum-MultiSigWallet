import React from 'react';

import { ConnectWallet } from '../ConnectWallet';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Link from 'next/link'

import styles from './MenuBar.module.css';

const MenuBar = () => {
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" position="absolute">
                    <Toolbar className={styles.toolbar}>
                        <Link href="/">
                            <h3>Multi-Sig Wallet</h3>
                        </Link>
                        <ConnectWallet/>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
};

export default MenuBar
