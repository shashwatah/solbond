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
    /// 4. `[]` The token program
    InitSolbond {  
        spouse1_name: String,
        spouse2_name: String,
        spouse1_soul_color: String,
        timestamp: u64,
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
                            
                Self::InitSolbond {
                    spouse1_name,
                    spouse2_name,
                    spouse1_soul_color,
                    timestamp
                }   
            }
            _ => return Err(InvalidInstruction.into()),
        })
    }
}

// const BN = require('bn.js');

// var name_utf8 = [...Buffer.from('Kumar Shashwat')];
// var name_full = new BN(name_utf8.reverse()).toArray("le", 25);
// console.log(name_utf8, name_full);

// var name2_utf8 = [...Buffer.from('Someone')];
// var name2_full = new BN(name2_utf8.reverse()).toArray("le", 25);
// console.log(name2_utf8, name2_full);

// var ammount = new BN(1555).toArray("le", 4);
// console.log(ammount, ...ammount);

// let data = Buffer.from(Uint8Array.of(0, ...ammount, ...name_full, ...name2_full));

// console.log(data, ...data);

