import React from 'react'

import { Paper, Button } from '@mui/material'

const TransactionQueue = () => {
  return (
    <div>
        <Paper sx={{ backgroundColor: 'light.main', p: '20px', mt: '20px' }}>
            <h4>Pending Transactions</h4>
        </Paper>
    </div>
  )
}

export default TransactionQueue