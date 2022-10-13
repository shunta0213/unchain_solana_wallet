import React, {useState} from "react";
import HeadComponent from "../components/Head";
import { airDrop } from "../contracts/airdrop/airdrop";
import { refreshBalance } from "../contracts/balance/getBalance";
import {generateWallet} from "../contracts/wallet/generateWallet"
import { importWallet } from "../contracts/wallet/importWallet";

export default function Home() {
  const [mnemonic, setMnemonic] = useState(null)
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(null)

  const handleImport = (e) => {
    e.preventDefault()
    const importedAccount = importWallet(e.target[0].value.trim().toLowerCase())
    setAccount(importedAccount)
  }

  return (
    <div>
      <HeadComponent />
      <div className="p-10">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
          <span className="text-[#9945FF]">Solana</span>ウォレットを作ろう！
        </h1>
        <div className="mx-auto mt-5 text-gray-500">
          Solanaウォレットの新規作成、インポート、エアドロップ、送金機能の開発にチャレンジしてみよう
        </div>

        <hr className="my-6" />

        <div>
          <h3 className="p-2 border-dotted border-l-8 border-l-indigo-600">
            My Wallet
          </h3>
          {account && <div className="my-6 text-indigo-600 font-bold">Address: {account.publicKey.toString()}</div>}
          {account && <button className="p-2 my-6 text-white bg-indigo-500 focus:ring focus:ring-indigo-300 rounded-lg cursor-pointer" onClick={() => airDrop(account, setBalance)}>Request Airdrop</button>}
          {typeof balance === "number" && <div className="my-6 font-bold">💰 残高: {balance} SOL</div>}
        </div>

        <hr className="my-6" />

        <div>
          <h2 className="p-2 border-dotted border-l-4 border-l-indigo-400">
            STEP1: ウォレットを新規作成する
          </h2>
          <button
            className="p-2 my-6 text-white bg-indigo-500 focus:ring focus:ring-indigo:300 rounded-lg cursor-pointer"
            onClick={() => generateWallet(setMnemonic, setAccount)}
          >
            ウォレット作成
          </button>
          {mnemonic && (
            <>
              <div className="mt-1 p-4 border border-gray-300 bg-gray-200">{mnemonic}</div>
              <strong className="text-xs">This is your mnemonic phrase. Take note</strong>
            </>
          )}
        </div>

        <hr className="my-6" />

        <div>
          <h2 className="p-2 border-dotted border-l-4 border-l-indigo-400">
            STEP2: 既存のウォレットをインポートする
          </h2>
          <form onSubmit={(e) => handleImport(e)} className="py-6">
            <div className="flex items-center border-b border-indigo-500 py-2">
              <input type="text" className="w-full text-gray-700 mr-3 p-1 focus:outline-none" placeholder="シークレットリカバリーフレーズ"/>
              <input
                  type="submit"
                  className="p-2 text-white bg-indigo-500 focus:ring focus:ring-indigo-300 rounded-lg cursor-pointer"
                  value="インポート"
                />
            </div>
          </form>
        </div>

        <hr className="my-6" />

        <div>
          <h2 className="p-2 border-dotted border-l-4 border-l-indigo-400">
            STEP3: 残高を取得する
          </h2>
          {account &&
            <button
              className="p-2 my-6 text-white bg-indigo-500 focus:ring focus:ring-indigo-300 rounded-lg cursor-pointer"
              onClick={() => refreshBalance(account, setBalance)}
            >
              残高を取得
            </button>}
        </div>

        <hr className="my-6" />

        <div>
          <h2 className="p-2 border-dotted border-l-4 border-l-indigo-400">
            STEP4: エアドロップ機能を実装する
          </h2>
        </div>

        <hr className="my-6" />

        <div>
          <h2 className="p-2 border-dotted border-l-4 border-l-indigo-400">
            STEP5: 送金機能を実装する
          </h2>
        </div>
      </div>
    </div>
  );
}
