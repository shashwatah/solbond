use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    program_pack::{Pack, IsInitialized},
    sysvar::{rent::Rent, Sysvar}
};

use crate::{error::SolbondError::NotRentExempt, instruction::SolbondInstruction, state::Solbond};

pub struct Processor;

impl Processor {
    pub fn process(
        accounts: &[AccountInfo],
        instruction_data: &[u8],
    ) -> ProgramResult {
        let instruction = SolbondInstruction::unpack(instruction_data)?;

        match instruction {
            SolbondInstruction::InitSolbond {
                spouse1_name,
                spouse2_name,
                spouse1_soul_color,
                timestamp,
            } => {
                msg!("Instruction: InitSolbond");
                Self::process_init_solbond(
                    accounts,
                    spouse1_name,
                    spouse2_name,
                    spouse1_soul_color,
                    timestamp
                )
            }
        }
    }

    pub fn process_init_solbond(
        accounts: &[AccountInfo],
        spouse1_name: String,
        spouse2_name: String,
        spouse1_soul_color: String,
        timestamp: u64
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

        let mut solbond_info = Solbond::unpack_unchecked(&solbond_account.data.borrow())?;
        if solbond_info.is_initialized() {
            return Err(ProgramError::AccountAlreadyInitialized);
        }
        
        solbond_info.is_initialized = true;
        solbond_info.validity1 = true;
        solbond_info.validity2 = false;
        solbond_info.spouse1_pubkey = *spouse1_account.key;
        solbond_info.spouse2_pubkey = *spouse2_account.key;
        solbond_info.spouse1_name = spouse1_name;
        solbond_info.spouse2_name = spouse2_name;
        solbond_info.spouse1_soul_color = spouse1_soul_color;
        solbond_info.timestamp = timestamp;

        Solbond::pack(solbond_info, &mut solbond_account.data.borrow_mut())?;

        Ok(())
    }
}
