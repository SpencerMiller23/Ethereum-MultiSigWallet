import React from 'react'

import { Paper, TextField, Button } from '@mui/material'

import styles from './CreateTransaction.module.css'

const CreateTransaction = () => {
  return (
    <div>
        <Paper sx={{ backgroundColor: 'light.main', p: '20px', mt: '20px' }}>
            <h4 className={styles.heading}>New Transaction</h4>
            <TextField label="Recipient" variant="outlined" sx={{ mb: '15px' }} fullWidth />
            <br />
            <TextField label="Value" variant="outlined" sx={{ mb: '15px' }} fullWidth />
            <br />
            <TextField label="Calldata" variant="outlined" sx={{ mb: '15px' }} fullWidth />
            <br />
            <Button variant="contained" color="primary">Submit</Button>
        </Paper>
    </div>
  )
}

export default CreateTransaction