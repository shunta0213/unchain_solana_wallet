import { Keypair } from "@solana/web3.js";
import * as Bip39 from "bip39";

export const generateWallet = (
  setMnemonic,
  setAccount
) => {
  const generatedMnemonic = Bip39.generateMnemonic();

  const seed = Bip39.mnemonicToSeedSync(generatedMnemonic).slice(0, 32);

  const newAccount = Keypair.fromSeed(seed);

  setMnemonic(generatedMnemonic)
  setAccount(newAccount)
};
