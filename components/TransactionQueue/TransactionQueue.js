import React from 'react'

import { Paper, Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

const TransactionQueue = ({ address }) => {
  return (
    <div>
        <Paper sx={{ backgroundColor: 'light.main', mt: '20px' }}>
            <h4>Pending Transactions</h4>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Recipient</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>0x</TableCell>
                            <TableCell>1.0 ETH</TableCell>
                            <TableCell>Approve</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </div>
  )
}

export default TransactionQueue