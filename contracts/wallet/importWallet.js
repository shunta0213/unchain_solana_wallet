import { Keypair } from "@solana/web3.js"
import * as Bip39 from "bip39"

export const importWallet = (inputMnemonic) => {
  const seed = Bip39.mnemonicToSeedSync(inputMnemonic).slice(0, 32)
  const importedAccount = Keypair.fromSeed(seed)
  return importedAccount
}