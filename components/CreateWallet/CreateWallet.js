import { Container } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

import styles from './CreateWallet.module.css'

const CreateWallet = () => {
    return (
        <Box sx={{ backgroundColor: '#f5f5f5', width: '100%', zIndex: '-1' }}>
            <Container maxWidth='lg'>
                <h4>Create Wallet</h4>
            </Container>
        </Box>
    )
};

export default CreateWallet;
