import React from 'react'

import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.container}>
        <a href='https://rinkeby.etherscan.io/address/0xC858bd1C73520Cb6933C18c3832785384d1cA51E' target="_blank">View on Etherscan</a>
        <a href='https://spencerverse.vercel.app/' target="_blank">Created by Spencer Miller</a>
    </div>
  )
}

export default Footer