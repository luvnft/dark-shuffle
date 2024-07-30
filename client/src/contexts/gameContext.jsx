import React, { createContext, useState } from "react";
import { getBlockWithTxs, getLatestBlock } from "../api/starknet";
import { delay } from "../helpers/utilities";
import { GAME_EFFECTS } from "../helpers/constants";

export const GameContext = createContext()

const GAME_VALUES = {
  gameId: null,
  inDraft: false,
  inBattle: false,
  name: 'Await'
}

export const GameProvider = ({ children }) => {
  const [values, setValues] = useState({ ...GAME_VALUES })
  const [gameEffects, setGameEffects] = useState({ ...GAME_EFFECTS })

  const [entropy, setEntropy] = useState({
    blockNumber: null,
    blockHash: null
  })

  const [score, setScore] = useState()

  // Client only states
  const [clientOnly, setClientOnly] = useState(false)

  const setGame = (values) => {
    setValues(prev => ({ ...prev, ...values }))
  }

  const endGame = () => {
    setValues({ ...GAME_VALUES })
    setScore()
  }

  const setGameEntropy = (gameEntropy) => {
    if (!gameEntropy) return;

    setEntropy({
      blockNumber: gameEntropy.blockNumber,
      blockHash: null
    })

    fetchBlockHash(gameEntropy.blockNumber);
  }

  const fetchBlockHash = async (blockNumber) => {
    let latestBlock = await getLatestBlock()

    if (latestBlock?.block_number === blockNumber) {
      return setEntropy(prev => ({
        ...prev,
        blockHash: latestBlock.block_hash
      }))
    }

    if (latestBlock?.block_number > blockNumber) {
      return specificBlockHash(blockNumber)
    }

    await delay(1000);
    return fetchBlockHash(blockNumber);
  }

  const specificBlockHash = async (blockNumber) => {
    let block = await getBlockWithTxs(blockNumber)

    if (block?.block_hash) {
      return setEntropy(prev => ({
        ...prev,
        blockHash: block.block_hash
      }))
    }

    await delay(1000);
    return specificBlockHash(blockNumber);
  }

  return (
    <GameContext.Provider
      value={{
        values,
        setGame,
        endGame,
        clientOnly,
        setClientOnly,
        setGameEntropy,
        entropy,
        score,
        setScore,
        gameEffects,
        setGameEffects
      }}
    >
      {children}
    </GameContext.Provider>
  );
};