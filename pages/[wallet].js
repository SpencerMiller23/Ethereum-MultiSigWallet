import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

const wallet = () => {
    const router = useRouter()
    const { wallet } = router.query
    
    return (
        <div>
            <p>{wallet}</p>
        </div>
    )
}

export default wallet