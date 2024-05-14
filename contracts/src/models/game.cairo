use starknet::{ContractAddress, get_caller_address};
use darkshuffle::models::battle::Battle;

#[derive(Model, Copy, Drop, Serde)]
struct Game {
    #[key]
    game_id: usize,
    player: ContractAddress,
    active: bool,
    in_draft: bool,
    in_battle: bool,
    battles_won: u16,
}

#[derive(Model, Copy, Drop, Serde)]
struct Leaderboard {
    #[key]
    game_id: usize,
    player: ContractAddress,
    score: u16,
}

#[generate_trait]
impl GameOwnerImpl of GameOwnerTrait { 
    fn assert_draft(self: Game) {
        assert(self.player == get_caller_address(), 'Not Owner');
        assert(self.active, 'Game over');
        assert(self.in_draft, 'Draft over');
    }
}