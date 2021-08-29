use thiserror::Error;

use solana_program::program_error::ProgramError;

#[derive(Error, Debug, Copy, Clone)]
pub enum SolbondError {
    #[error("Invalid Instruction")]
    InvalidInstruction,

    #[error("Account is not rent-exempt")]
    NotRentExempt,
}

impl From<SolbondError> for ProgramError {
    fn from(e: SolbondError) -> Self {
        ProgramError::Custom(e as u32)
    }
}
