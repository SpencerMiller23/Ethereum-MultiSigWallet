import React from 'react';

import { ConnectWallet } from '../ConnectWallet';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const MenuBar = () => {
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <ConnectWallet/>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
};

export default MenuBar
