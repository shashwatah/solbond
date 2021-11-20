<h1 align="center">
  <br>
  <a href="https://solbond.vercel.app"><img src="https://github.com/Araekiel/solbond/blob/main/assets/solbond-logo.webp" alt="Solbond" width="200"></a>
  <br>
  Solbond
  <br>
</h1>

<h4 align="center">
An on-chain wedding registry dApp built on Solana with <a href="https://www.rust-lang.org/">Rust</a> and <a href="https://svelte.dev/">Svelte.js</a>.
</h4>

<p align="center">
  <a><img alt="MIT License" src="https://img.shields.io/apm/l/atomic-design-ui.svg?"></a>
  <a><img alt="Vercel Deployment" src="http://therealsujitk-vercel-badge.vercel.app/?app=solbond"/></a>
  <a href="http://makeapullrequest.com">
    <img alt="PRs Welcome"src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat">
  </a>
</p>

<p align="center">
  <a href="#about">About</a> •
  <a href="#notes">Notes</a> •
  <a href="#prerequisites">Prerequisites</a> •
  <a href="#installation">Setup</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#references">References</a> •
  <a href="#authors">Authors</a> •
  <a href="#license">License</a>
</p>


<img alt="Screenshot" src="https://github.com/Araekiel/solbond/blob/main/assets/solbond_ss.jpeg"/>

## About

This project was made as a submission for the on-chain wedding track by [Superpumped](https://www.youtube.com/channel/UCi-pkXLbm7sqXFhV1NBLUfQ) in the 'Building out Loud' Hackathon by Solana.
This repo contains code for both, the Solana Program built with Rust and the client built with Svelte, JavaScript, and TypeScript.

## Notes

- Future Updates
    - Any error encountered when sending a transaction, e.g. not enough balance in the wallet, displays the same, vague error message: 'Transaction resulted in an error'. I'll fix this later. 

- Features expected to be on an on-chain wedding dApp but do not exist on Solbond:
    - Shared assets account - The solana program already creates an account to store each solbond's state, the same account can be used as shared asset accounts.
    - Annulment - Upon annulment the above mentioned account can be dissolved and the assets can be divided among the partners.
    - KYC - on-chain or off-chain KYC is needed to make a dApp that solves this particular problem, legally viable.

## Prerequisites

#### for running the dApp locally:

- General 
    - Git is need to clone the repository on your machine.

- Client: 
    - npm is needed to install packages.
    - Node.js is needed to run the client.

- Program 
    - Rust and Solana CLI tools are needed to build the program and run a test-validator.

#### for using the dApp:

- 2 Sollet wallets are needed to use the dApp (Only sollet is supported currently).

## Setup 

- Follow the [Client README](https://github.com/Araekiel/solbond/tree/master/client#readme) to setup the client.

- Follow the [Program README](https://github.com/Araekiel/solbond/tree/master/program#readme) to setup the program.


## Deployment

Solbond's client is currently deployed on Vercel, and the program is deployed on devnet.
<br/>
Click [here](https://solbond.vercel.app) to visit.

## References

- Paul Shcaaf's Escrow Program: [https://github.com/paul-schaaf/solana-escrow/tree/master/program](https://github.com/paul-schaaf/solana-escrow/tree/master/program)

- Paul Schaaf's Escrow Client: [https://github.com/paul-schaaf/escrow-ui](https://github.com/paul-schaaf/escrow-ui)

- Claude Barde's 'Get Married on the Blockchain!' medium article: [https://medium.com/coinmonks/get-married-on-the-blockchain-25091f12399b](https://medium.com/coinmonks/get-married-on-the-blockchain-25091f12399b)

- Solana Program Library: [https://github.com/solana-labs/solana-program-library](https://github.com/solana-labs/solana-program-library)

## Authors

- **Araekiel** - [Github](https://github.com/Araekiel)

## License

[MIT License](https://github.com/Araekiel/solbond/blob/master/LICENSE) | Copyright (c) 2021 Kumar Shashwat
