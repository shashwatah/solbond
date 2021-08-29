use thiserror::Error;

use solana_program::program_error::ProgramError;

#[derive(Error, Debug, Copy, Clone)]
pub enum SolbondError {
    #[error("Invalid Instruction")]
    InvalidInstruction,
}

impl From<SolbondError> for ProgramError {
    fn from(e: SolbondError) -> Self {
        ProgramError::Custom(e as u32)
    }
}
