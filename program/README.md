<h1 align="center">solbond-program</h1>

<h4 align="center">
This folder contains the code for Solbond's solana program built with Rust.</h4>

<p align="center">
  <a href="#prerequisites">Prerequisites</a> •
  <a href="#build--deploy">Build & Deploy</a> 
</p>

## Prerequisites

- Rust is needed for obvious reasons.
- Solana Command Line Tools are needed to build the *_.so_* file and run the local test-validator (if needed).

#### Install the requisites:

- Install Rust from [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)
- Install Solana CLI tools by following the tutorial at [https://docs.solana.com/cli/install-solana-cli-tools](https://docs.solana.com/cli/install-solana-cli-tools)

> WSL is recommended if you are using Windows. To install and setup WSL 2 follow the tutorial at [https://docs.solana.com/cli/install-solana-cli-tools](https://docs.solana.com/cli/install-solana-cli-tools)

## Build & Deploy 

Building the program is fairly easy: 

- Open your terminal (wsl if on windows) and run:

```bash
cargo build-bpf
```

- A *_.so_* file will be generated at the location mentioned in the output.

To deploy the program: 

- Make sure your solana cli config is set to the endpoint you desire.
- Make sure your wallet has enough *_SOL_*, if not, airdrop enough. 
- Run the following command: 

```bash
solana program deploy *path_to_.so_file*
```

