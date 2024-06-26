import { motion } from "framer-motion"
import { fadeVariant } from "../helpers/variants"
import { LoadingButton } from '@mui/lab'
import { Box, Button, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { fetchIntroduction, fetchZoneName } from '../battle/monsterUtils'
import Overview from '../components/draft/overview'
import { BattleContext } from '../contexts/battleContext'
import { GameContext } from '../contexts/gameContext'
import { CardSize } from '../helpers/cards'

function StartBattleContainer() {
  const game = useContext(GameContext)
  const battle = useContext(BattleContext)

  let monster = fetchIntroduction(game.values.battlesWon)

  return (
    <motion.div style={styles.container} variants={fadeVariant} initial='initial' exit='exit' animate='enter'>
      <Box sx={styles.container}>

        <Box sx={styles.draftContainer}>

          <Box sx={styles.mainContainer}>

            <Box sx={styles.battleContainer}>

              <Typography color='primary'>
                {monster.description}
              </Typography>

              {monster.image}

              <LoadingButton loading={battle.state.pendingTx} variant='outlined' sx={{ fontSize: '20px', letterSpacing: '2px', textTransform: 'none' }}
                onClick={() => battle.actions.startBattle()}>
                Start Battle
              </LoadingButton>
            </Box>

          </Box>

          <Box sx={styles.draftInfo}>

            <Box width='151px'>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Typography variant='h6'>
                {fetchZoneName(game.values.battlesWon)}
              </Typography>

              <Typography variant='h2' color='primary'>
                Monsters Slain
              </Typography>

              <Typography variant='h1' color='primary' sx={{ fontSize: '50px', mt: 2 }}>
                {game.values.battlesWon}
              </Typography>
            </Box>

            <Box display={'flex'} alignItems={'flex-end'} height={'100%'}>
              <Button color='error' variant='outlined' sx={{ textTransform: 'none', mt: 2, fontSize: '16px' }}>
                Abandon Cave
              </Button>
            </Box>

          </Box>

        </Box>

        <Box sx={styles.overview}>

          <Overview />

        </Box>

      </Box >
    </motion.div>
  )
}

export default StartBattleContainer

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex'
  },

  overview: {
    width: '300px',
    height: '100%'
  },

  draftContainer: {
    height: '100%',
    width: 'calc(100% - 300px)',
    borderRight: '1px solid rgba(255, 255, 255, 0.12)'
  },

  mainContainer: {
    width: '100%',
    height: 'calc(100% - 285px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    py: 10,
    boxSizing: 'border-box'
  },

  cards: {
    display: 'flex',
    gap: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },

  draftInfo: {
    minHeight: '230px',
    height: '230px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
    p: 2,
    boxSizing: 'border-box'
  },

  cardContainer: {
    height: CardSize.big.height,
    width: CardSize.big.width,
  },

  battleContainer: {
    background: 'rgba(0, 0, 0, 0.3)',
    width: '800px',
    height: '100%',
    p: 2,
    pb: 4,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center'
  }
}