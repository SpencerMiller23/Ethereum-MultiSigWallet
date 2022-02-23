import React from 'react'

import { useRouter } from 'next/router'

import { Assets } from '../components/Assets'
import { TransactionQueue } from '../components/TransactionQueue'
import { CreateTransaction } from '../components/CreateTransaction'
import { History } from '../components/History'

import { Grid } from '@mui/material'

const wallet = () => {
    const router = useRouter()
    const { wallet } = router.query
    
    return (
        <div>
            <h4>Wallet: {wallet}</h4>
            <Assets wallet={wallet} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TransactionQueue address={wallet} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CreateTransaction address={wallet} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <History address={wallet} />
                </Grid>
            </Grid>
        </div>
    )
}

export default wallet