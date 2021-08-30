use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
    program_pack::{Pack, IsInitialized},
    sysvar::{rent::Rent, Sysvar}
};

use crate::{error::SolbondError::NotRentExempt, instruction::SolbondInstruction};

pub struct Processor;

impl Processor {
    pub fn process(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        instruction_data: &[u8],
    ) -> ProgramResult {
        let instruction = SolbondInstruction::unpack(instruction_data)?;

        match instruction {
            SolbondInstruction::InitSolbond {
                spouse1_name,
                spouse2_name,
                timestamp,
            } => {
                msg!("Instruction: InitSolbond");
                Self::process_init_solbond(
                    accounts,
                    spouse1_name,
                    spouse2_name,
                    timestamp,
                    program_id,
                )
            }
        }
    }

    pub fn process_init_solbond(
        accounts: &[AccountInfo],
        spouse1_name: String,
        spouse2_name: String,
        timestamp: u32,
        program_id: &Pubkey,
    ) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();
        let spouse1_account = next_account_info(account_info_iter)?;

        if !spouse1_account.is_signer {
            return Err(ProgramError::MissingRequiredSignature);
        }

        let spouse2_account = next_account_info(account_info_iter)?;
        let solbond_account = next_account_info(account_info_iter)?;
        
        let rent = &Rent::from_account_info(next_account_info(account_info_iter)?)?;

        if !rent.is_exempt(solbond_account.lamports(), solbond_account.data_len()) {
            return Err(NotRentExempt.into());
        }

        // let mut escrow_info = Escrow::unpack_unchecked(&escrow_account.data.borrow())?;
        // if escrow_info.is_initialized() {
        //     return Err(ProgramError::AccountAlreadyInitialized);
        // }
        
        Ok(())
    }
}
