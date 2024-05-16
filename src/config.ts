import { mainnet, sepolia } from 'wagmi/chains'
import { Buffer } from 'buffer'

window.Buffer = Buffer

export const WC_PROJECT_ID = import.meta.env.VITE_WC_PROJECT_ID ?? ''
export const DEFAULT_CHAIN = import.meta.env.DEFAULT_CHAIN ?? mainnet.id
export const SUPPORTED_CHAINS = [mainnet.id, sepolia.id]
export const TEST_MODE = import.meta.env.TEST_MODE ?? false
export const ACCOUNTS_ADDRESSES = [
  { address: '0x190E24A724bE6102e9CD512c38596cdA0D0Bac5F', catId: 1 },
  { address: '0x76d72839F929f9D2e1aB40E64378ecb98dcf4f43', catId: 1 },
  { address: '0x972612D0F292f6d21b93A246e0FB5b1c6D1A2e58', catId: 1 },
  { address: '0x38f077a4657265A1a522bC401B82A00c9D30981C', catId: 1 },
  { address: '0xdF6c8CBa3453721a1004ADbD9d32698C3C3fCA6C', catId: 1 },
  { address: '0x27C0Ee7B61fC8068a1132e58E72F2258Cc1205a3', catId: 1 },
  { address: '0x7017d22EAa398de8C61f2F7C504ce9847747A10A', catId: 1 },
  { address: '0xD60b60F48e06C026b1742189881A0e2b7d1Ac4E6', catId: 1 },
  { address: '0x28452E39aB4fA69F5AEDcd775289a12e92d53dA0', catId: 1 },
  { address: '0x050DBbbe1bbB5462596C75B52F4d76A039E64D79', catId: 2 },
  { address: '0xE9d7c649e18B50edA1F969a566CaeA7c138A0717', catId: 2 },
  { address: '0x0B519435b1a0f1295C520fA07750ff9c7Dad711d', catId: 2 },
  { address: '0xDC84AA9b81F06cE775a1b50EE45EE4366C546e59', catId: 2 },
  { address: '0x9002D279a9B3a8EC967267C168F19E124a37a50f', catId: 2 },
  { address: '0x02EA03817a628000314bEBb78e9133fCC9fa993B', catId: 2 },
  { address: '0xA9d3442c17cCb4fC06e4A545B4e039B04b247C0B', catId: 2 },
  { address: '0x43935314dB4d48B1b0413847185c2ED1CB35fb01', catId: 2 },
  { address: '0x1E12b351866bc9aecac95F8E018E890b62312440', catId: 2 },
  { address: '0x7954d2C1C16AA31a895F376fD87CEd70CE6Bb2CD', catId: 2 },
  { address: '0xf7C03B7d913fa1975946BC52F69FD468918C6335', catId: 2 },
  { address: '0x02C3030AE684DE5C0136D84Dc8c93D05B686484b', catId: 2 },
  { address: '0x0E182aa91Cd3A9Cf8410364A65417bB47500e70b', catId: 2 },
  { address: '0x4c7aEf009D3A5E92495cDfB08f5929b1a4F4cfd7', catId: 2 },
  { address: '0x31Ea018d6CA90165F2707906B79EB23Ed85d5E45', catId: 2 },
  { address: '0x4B93b4e2E08675D052697a16b554066be534b333', catId: 2 },
  { address: '0x233D429BCA6ADb41EDd76BB5EB6bD436f1c5166F', catId: 2 },
  { address: '0x05AF60508a0D727647915b45D18EDc1628547217', catId: 2 },
]
