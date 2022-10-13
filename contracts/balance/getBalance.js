import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { connectSolana } from "../connect/connect";

export const refreshBalance = async (account, setBalance) => {
  const conn = connectSolana();
  const publicKey = account.publicKey

  try{
    let balance = await conn.getBalance(publicKey)
    balance = balance / LAMPORTS_PER_SOL;
    console.log("balance", balance)
    setBalance(balance)
  } catch (e) {
    console.log("error", e)
  }
}