import React, { useContext, useEffect } from "react";
import { AnimationContext } from '../../../contexts/animationHandler';
import { BattleContext } from '../../../contexts/battleContext';
import MonsterMain from './main';

function Spider(props) {
  const animationHandler = useContext(AnimationContext)
  const battle = useContext(BattleContext)

  const { monster } = props

  useEffect(() => {
    if (animationHandler.monsterAnimations.length < 1) {
      return
    }

    const animation = animationHandler.monsterAnimations[0]

    if (animation.type === 'ability') {
      animationHandler.setMonsterAnimations(prev => prev.filter(x => x.type !== 'ability'))

      if (battle.state.board.length > 0) {
        animationHandler.addAnimation('board', null, battle.state.board.map(creature => ({
          targetPosition: battle.utils.getCreaturePosition(creature.id), position: battle.utils.getMonsterPosition()
        })))
      } else {
        animationHandler.animationCompleted({ type: 'monsterAbility' })
      }
    }
  }, [animationHandler.monsterAnimations])

  return <>
    <MonsterMain monster={monster} />
  </>
}

export default Spider