import React from 'react'

import { useRouter } from 'next/router'

import { Assets } from '../components/Assets'

const wallet = () => {
    const router = useRouter()
    const { wallet } = router.query
    
    return (
        <div>
            <h4>Wallet: {wallet}</h4>
            <Assets wallet={wallet} />
        </div>
    )
}

export default wallet