# Ethereum Multi-sig Wallet

## Overview

This is an open-source implementation of an Ethereum multi-sig wallet with a React-based UI. A multi-sig wallet is a cryptocurrency wallet that requires two or more private keys to sign and send a transaction. The purpose of this project is to encourage new Solidity developers to get started with open-source development.

Feel free to get started and make a contribution to this project, no matter how small!

## Getting started

1) Clone the repository by running `git clone https://github.com/SpencerMiller23/Ethereum-MultiSigWallet.git`
2) Install dependencies by running `npm install`

## TO-DO

- [ ] Add alerts for errors
- [ ] Add redux for handling global state
- [x] Integrate database for storing off-chain data about wallets
- [ ] List wallets in drawer that have the connected user as an owner
- [ ] Implement wallet page
- [ ] Improve test coverage

## Useful links

- [Solidity](https://docs.soliditylang.org/en/v0.8.11/)
- [Hardhat](https://hardhat.org/)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/docs/)
- [MaterialUI](https://mui.com/getting-started/installation/)

## Deploy locally

### Prerequisites
- PostgreSQL database on Heroku [(see this guide)](https://dev.to/prisma/how-to-setup-a-free-postgresql-database-on-heroku-1dc1)

### Deployment
1) Update `DATABASE_URL` in the `.env` file
2) Open a terminal window and run `npx hardhat node`
3) Open a second terminal window and run `npx hardhat run scripts/deploy.js --network localhost`
4) Copy the address of the deployed factory contract and update the value stored in `config.js`
5) Open a third terminal window and run `npm run dev`

## Testing

- Run `npx hardhat test`

## Hardhat

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.js
node scripts/deploy.js
npx eslint '**/*.js'
npx eslint '**/*.js' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

## Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/deploy.js
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

MIT