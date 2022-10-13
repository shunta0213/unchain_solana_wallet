import { clusterApiUrl, Connection } from "@solana/web3.js";

export const connectSolana = () => {
  const netWork = 'devnet';
  const connection = new Connection(clusterApiUrl(netWork), "confirmed")
  return connection
}

