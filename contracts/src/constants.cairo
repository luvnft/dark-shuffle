const ADVENTURER_ID: u16 = 65535;
const CARD_POOL_SIZE: u16 = 24;
const DECK_SIZE: u8 = 8;
const DISCARD_COST: u8 = 1;
const MAX_BOARD: u8 = 6;

const START_ENERGY: u16 = 8;
const START_HEALTH: u16 = 30;

const MONSTER_KILL_SCORE: u16 = 100;
const PRIZES: u8 = 5;

mod CardTypes {
    const CREATURE: felt252 = 'Creature'; 
    const SPELL: felt252 = 'Spell';
}

mod CardTags {
    const SCAVENGER: felt252 = 'Scavenger';
    const DEMON: felt252 = 'Demon';
    const PRIEST: felt252 = 'Priest';
    const SPELL: felt252 = 'Spell';
    const NONE: felt252 = '\u0000';
}

mod ActionTypes {
    const SUMMON_CREATURE: felt252 = 'summon_creature';
    const CAST_SPELL: felt252 = 'cast_spell';
    const ATTACK: felt252 = 'attack';
    const DISCARD: felt252 = 'discard';
}

mod Messages {
    const NOT_OWNER: felt252 = 'Not authorized to act';
    const NOT_IN_DRAFT: felt252 = 'Not in draft';
    const GAME_OVER: felt252 = 'Game over';
    const IN_BATTLE: felt252 = 'Already in battle';
    const IN_DRAFT: felt252 = 'Draft not over';
    const BLOCK_REVEAL: felt252 = 'Block not revealed';
    const SCORE_SUBMITTED: felt252 = 'Score already submitted';
}

const U128_MAX: u128 = 340282366920938463463374607431768211455;
const LCG_PRIME: u128 = 2147483647;