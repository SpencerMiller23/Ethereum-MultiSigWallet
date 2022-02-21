import React from 'react'

import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MultiSigWallet from '../../artifacts/contracts/MultiSigWallet.sol/MultiSigWallet.json'

const Actions = ({ address, idx }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const approveTransaction = async (txIdx) => {
        handleClose()
        try {
            const signer = await getSignerAccount()
            const wallet = new ethers.Contract(address, MultiSigWallet.abi, signer)
            await wallet.approve(ethers.BigNumber.from(txIdx))
        } catch (err) {
            console.log(err)
        }
    }

    const rejectTransaction = async (txIdx) => {
        handleClose()
        try {
            const signer = await getSignerAccount()
            const wallet = new ethers.Contract(address, MultiSigWallet.abi, signer)
            await wallet.reject(ethers.BigNumber.from(txIdx))
        } catch (err) {
            console.log(err)
        }
    }

    const executeTransaction = async (txIdx) => {
        handleClose()
        try {
            const signer = await getSignerAccount()
            const wallet = new ethers.Contract(address, MultiSigWallet.abi, signer)
            await wallet.execute(ethers.BigNumber.from(txIdx))
        } catch (err) {
            console.log(err)
        }
    }

    const getSignerAccount = async () => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        return provider.getSigner()
    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant='contained'
                onClick={handleClick}
            >
                Actions
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => rejectTransaction(idx)}>Reject</MenuItem>
                <MenuItem onClick={() => approveTransaction(idx)}>Approve</MenuItem>
                <MenuItem onClick={() => executeTransaction(idx)}>Execute</MenuItem>
            </Menu>
        </div>
    )
}

export default Actions