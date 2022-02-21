import React from 'react'

import { Paper } from '@mui/material'

const Overview = () => {
  return (
    <div>
        <Paper sx={{ backgroundColor: 'light.main', p: '20px', mt: '20px' }}>
            <h4>How it works</h4>
            <p>A multi-signature wallet is a cryptocurrency wallet that requires multiple signatures from multiple owners to perform a transaction.</p>
            <p>These types of wallets help to mitigate security concerns that come with a signle private key mechanism.</p>
            <p>Create a new multi-signature wallet by giving it a memorable name, and filling in the addresses of any number of owners along with the number of required signatures.</p>
        </Paper>
    </div>
  )
}

export default Overview