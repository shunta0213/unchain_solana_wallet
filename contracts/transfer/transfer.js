import { SystemProgram, PublicKey, LAMPORTS_PER_SOL, Transaction, Account, sendAndConfirmRawTransaction } from "@solana/web3.js";
import { refreshBalance } from "../balance/getBalance";
import { connectSolana } from "../connect/connect"

export const transfer = async (toAddress, fromAccount, setTransactionSig, setBalance) => {
  const conn = connectSolana();

  const transferDetails = SystemProgram.transfer({
    fromPubkey: fromAccount.publicKey,
    toPubkey: new PublicKey(toAddress),
    lamports: LAMPORTS_PER_SOL,
  })

  try {
    const transaction = new Transaction().add(transferDetails)

    const signers = [
      {
        publicKey: fromAccount.publicKey,
        secretKey: fromAccount.secretKey
      }
    ]

    const sendTransaction = await sendAndConfirmRawTransaction(
      conn,
      transaction,
      signers,
    )
    console.log("confirmation", sendTransaction)
    setTransactionSig(sendTransaction)
    await refreshBalance(fromAccount, setBalance)
  } catch(e) {
    console.log("error", e)
  }
}