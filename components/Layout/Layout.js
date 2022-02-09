import React from 'react'

import { MenuBar } from '../MenuBar'
import { Drawer } from '../Drawer'

import { Container } from '@mui/material'
import { Box } from '@mui/system'

const Layout = ({ children }) => {
  return (
    <>
        <MenuBar/>
        <div className="flex flex-row mt">
            <Drawer/>
            <Box sx={{ backgroundColor: '#f5f5f5', width: '100%' }}>
                <Container maxWidth='lg'>
                    {children}
                </Container>
            </Box>
        </div>
    </>
  )
}

export default Layout