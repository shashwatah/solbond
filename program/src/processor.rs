use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    program_pack::{Pack, IsInitialized},
    sysvar::{rent::Rent, Sysvar}
};

use crate::{error::SolbondError::{NotRentExempt, InvalidInstruction}, instruction::SolbondInstruction, state::Solbond};

pub struct Processor;

impl Processor {
    pub fn process(
        accounts: &[AccountInfo],
        instruction_data: &[u8],
    ) -> ProgramResult {
        let instruction = SolbondInstruction::unpack(instruction_data)?;

        match instruction {
            SolbondInstruction::RegisterSolbond {
                spouse1_name,
                spouse2_name,
                spouse1_soul_color,
                timestamp,
            } => {
                msg!("Instruction: RegisterSolbond");
                Self::process_register_solbond(
                    accounts,
                    spouse1_name,
                    spouse2_name,
                    spouse1_soul_color,
                    timestamp
                )
            }

            SolbondInstruction::ValidateSolbond {
                spouse2_soul_color
            } => {
                msg!("Instruction: ValidateSolbond");
                Self::process_validate_solbond(
                    accounts,
                    spouse2_soul_color
                )
            }
        }
    }

    pub fn process_register_solbond(
        accounts: &[AccountInfo],
        spouse1_name: String,
        spouse2_name: String,
        spouse1_soul_color: String,
        timestamp: u64
    ) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();
        
        let spouse1_account = next_account_info(account_info_iter)?;
        let spouse2_account = next_account_info(account_info_iter)?;
        let solbond_account = next_account_info(account_info_iter)?;
        let rent = &Rent::from_account_info(next_account_info(account_info_iter)?)?;

        let mut solbond_info = Solbond::unpack_unchecked(&solbond_account.data.borrow())?;
        
        if !spouse1_account.is_signer {
            return Err(ProgramError::MissingRequiredSignature);
        }

        if spouse1_account.key == spouse2_account.key {
            return Err(ProgramError::InvalidAccountData);
        }
        
        if !rent.is_exempt(solbond_account.lamports(), solbond_account.data_len()) {
            return Err(NotRentExempt.into());
        }

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

    pub fn process_validate_solbond(accounts: &[AccountInfo], spouse2_soul_color: String) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();

        let spouse2_account = next_account_info(account_info_iter)?;
        let solbond_account = next_account_info(account_info_iter)?;
        
        let mut solbond_account_info = Solbond::unpack_unchecked(&solbond_account.data.borrow())?;

        if !spouse2_account.is_signer {
            return Err(ProgramError::MissingRequiredSignature);
        }

        if solbond_account_info.spouse2_pubkey != *spouse2_account.key {
            return Err(ProgramError::InvalidAccountData);
        }

        if solbond_account_info.validity2 == true {
            return Err(InvalidInstruction.into());
        }

        solbond_account_info.validity2 = true;
        solbond_account_info.spouse2_soul_color = spouse2_soul_color;

        Solbond::pack(solbond_account_info, &mut solbond_account.data.borrow_mut())?;

        Ok(())
    }
}