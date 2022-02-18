import gql from 'fake-tag';

export const BattleshipGameDetails = gql`
  fragment BattleshipGameDetails on BattleshipGame {
    id
    status
    totalShots
    winner
  }
`;

export const ShotDetails = gql`
  fragment ShotDetails on Shot {
    id
    game {
      id
    }
    hit
    turn
  }
`;
