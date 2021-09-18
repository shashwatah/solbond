use std::convert::TryInto;
use std::str::from_utf8;
use solana_program::program_error::ProgramError; 

use crate::error::SolbondError::InvalidInstruction;

pub enum SolbondInstruction {
    /// Accounts expected:
    ///
    /// 0. `[signer]` The account of the person initializing the Solbond, i.e spouse1
    /// 1. `[]` spouse2's account 
    /// 2. `[writable]` Solbond account that should be created prior to this instruction and owned by the initializer
    /// 3. `[]` The rent sysvar
    RegisterSolbond {  
        spouse1_name: String,
        spouse2_name: String,
        spouse1_soul_color: String,
        timestamp: u64,
    },

    /// 0. `[signer]` The account of the person validating the Solbond, i.e. spouse2 
    /// 1. `[writable]` Solbond account 
    ValidateSolbond {
        spouse2_soul_color: String
    }
}

impl SolbondInstruction {
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (tag, rest) = input.split_first().ok_or(InvalidInstruction)?;

        Ok(match tag {
            0 => {
                let (spouse1_name_slice, rest) = rest.split_at(25);
                let spouse1_name = String::from(from_utf8(spouse1_name_slice).unwrap());

                let (spouse2_name_slice, _rest) = rest.split_at(25);
                let spouse2_name =  String::from(from_utf8(spouse2_name_slice).unwrap());

                let (spouse1_soul_color_slice, __rest) = _rest.split_at(6);
                let spouse1_soul_color = String::from(from_utf8(spouse1_soul_color_slice).unwrap());

                let timestamp = __rest.get(..8)
                            .and_then(|slice| slice.try_into().ok())
                            .map(u64::from_le_bytes)
                            .ok_or(InvalidInstruction)?;
                            
                Self::RegisterSolbond {
                    spouse1_name,
                    spouse2_name,
                    spouse1_soul_color,
                    timestamp
                }   
            }
            1 => {
                if rest.len() != 6 {
                    return Err(InvalidInstruction.into());
                }

                let spouse2_soul_color = String::from(from_utf8(rest).unwrap());

                Self::ValidateSolbond {
                    spouse2_soul_color
                }
            }
            _ => return Err(InvalidInstruction.into()),
        })
    }
}
