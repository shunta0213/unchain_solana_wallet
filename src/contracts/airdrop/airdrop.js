import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { refreshBalance } from "../../../contracts/balance/getBalance";
import { connectSolana } from "../connect/connect"

export const airDrop = async (account, setBalance) => {
  const conn = connectSolana();
  const publicKey = account.publicKey

  try{
    const reqAirdrop = await conn.requestAirdrop(publicKey, LAMPORTS_PER_SOL)
    await conn.confirmTransaction(reqAirdrop, "confirmed")
    await refreshBalance(account, setBalance);
  } catch (e) {
    console.log("error", e)
  }
}