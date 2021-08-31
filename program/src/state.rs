use solana_program::{
    program_pack::{IsInitialized, Pack, Sealed},
    program_error::ProgramError,
    pubkey::Pubkey
};
use std::convert::TryInto;
use std::str::from_utf8;
use arrayref::{array_mut_ref, array_ref, array_refs, mut_array_refs};
pub struct Solbond {
    pub is_initialized: bool,
    pub validity1: bool,
    pub validity2: bool,
    pub spouse1_pubkey: Pubkey,
    pub spouse2_pubkey: Pubkey,
    pub spouse1_name: String,
    pub spouse2_name: String, 
    pub timestamp: u32
}

impl Sealed for Solbond {}

impl IsInitialized for Solbond {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}

impl Pack for Solbond {
    const LEN: usize = 121;
    fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
        let src = array_ref![src, 0, Solbond::LEN];
        let (
            is_initialized,
            validity1,
            validity2,
            spouse1_pubkey,
            spouse2_pubkey,
            spouse1_name,
            spouse2_name,
            timestamp
        ) = array_refs![src, 1, 1, 1, 32, 32, 25, 25, 4];

        let is_initialized = match is_initialized {
            [0] => false,
            [1] => true,
            _ => return Err(ProgramError::InvalidAccountData),
        };

        let validity1 = match validity1 {
            [0] => false,
            [1] => true,
            _ => return Err(ProgramError::InvalidAccountData),
        };

        let validity2 = match validity2 {
            [0] => false,
            [1] => true,
            _ => return Err(ProgramError::InvalidAccountData),
        };

        Ok(Solbond {
            is_initialized,
            validity1,
            validity2,
            spouse1_pubkey: Pubkey::new_from_array(*spouse1_pubkey),
            spouse2_pubkey: Pubkey::new_from_array(*spouse2_pubkey),
            spouse1_name: String::from(from_utf8(spouse1_name).unwrap()),
            spouse2_name: String::from(from_utf8(spouse2_name).unwrap()),
            timestamp: timestamp.get(..4)
                                .and_then(|slice| slice.try_into().ok())
                                .map(u32::from_le_bytes)
                                .ok_or(ProgramError::InvalidInstructionData)?
        })
    }

    fn pack_into_slice(&self, dst: &mut [u8]) {
        let dst = array_mut_ref![dst, 0, Solbond::LEN];
        
        let (
            is_initialized_dst,
            validity1_dst,
            validity2_dst,
            spouse1_pubkey_dst,
            spouse2_pubkey_dst,
            spouse1_name_dst,
            spouse2_name_dst,
            timestamp_dst
        ) = mut_array_refs![dst, 1, 1, 1, 32, 32, 25, 25, 4];

        let Solbond {
            is_initialized,
            validity1,
            validity2,
            spouse1_pubkey,
            spouse2_pubkey,
            spouse1_name,
            spouse2_name,
            timestamp
        } = self;

        is_initialized_dst[0] = *is_initialized as u8;
        validity1_dst[0] = *validity1 as u8;
        validity2_dst[0] = *validity2 as u8;
        spouse1_pubkey_dst.copy_from_slice(spouse1_pubkey.as_ref());
        spouse2_pubkey_dst.copy_from_slice(spouse2_pubkey.as_ref());

        // check the code below this comment 
        let mut spouse1_name_bytes: [u8; 25] = [0; 25];
        let mut spouse2_name_bytes: [u8; 25] = [0; 25];

        spouse1_name_bytes[..spouse1_name.len()].copy_from_slice(spouse1_name.as_bytes());
        spouse2_name_bytes[..spouse2_name.len()].copy_from_slice(spouse2_name.as_bytes());

        *spouse1_name_dst = spouse1_name_bytes;
        *spouse2_name_dst = spouse2_name_bytes;
        // and above this comment

        *timestamp_dst = timestamp.to_le_bytes();

    }
}
