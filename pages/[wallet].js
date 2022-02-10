import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { Assets } from '../components/Assets'

const wallet = () => {
    const router = useRouter()
    const { wallet } = router.query
    
    return (
        <div>
            <h4>Wallet: {wallet}</h4>
            <Assets />
        </div>
    )
}

export default wallet