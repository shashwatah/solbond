use std::convert::TryInto;
use solana_program::program_error::ProgramError; 

use crate::error::SolbondError::{self, InvalidInstruction};

pub enum SolbondInstruction {
    InitSolbond {  
        spouse1_name: String,
        spouse2_name: String,
        location: String,
        timestamp: u32,
    }
}

impl SolbondInstruction {
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (tag, rest) = input.split_first().ok_or(InvalidInstruction)?;

        Ok(match tag {
            0 => Self::InitSolbond {
                spouse1_name: String::from("Spouse 1"),
                spouse2_name: String::from("Spouse 2"),
                location: String::from("Tomorrowland"),
                timestamp: 12
            },
            _ => return Err(InvalidInstruction.into()),
        })
    }
}


// impl EscrowInstruction {
//     /// Unpacks a byte buffer into a [EscrowInstruction](enum.EscrowInstruction.html).
//     pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
//         let (tag, rest) = input.split_first().ok_or(InvalidInstruction)?;

//         Ok(match tag {
//             0 => Self::InitEscrow {
//                 amount: Self::unpack_amount(rest)?,
//             },
//             _ => return Err(InvalidInstruction.into()),
//         })
//     }

//     fn unpack_amount(input: &[u8]) -> Result<u64, ProgramError> {
//         let amount = input
//             .get(..8)
//             .and_then(|slice| slice.try_into().ok())
//             .map(u64::from_le_bytes)
//             .ok_or(InvalidInstruction)?;
//         Ok(amount)
//     }
// }