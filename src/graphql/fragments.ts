import gql from 'fake-tag';

export const BattleshipGameDetails = gql`
  fragment BattleshipGameDetails on BattleshipGame {
    id
    joinedBy
    startedBy
    status
    shots(first: 200, orderBy: turn, orderDirection: asc) {
      hit
      x
      y
      turn
    }
  }
`;

export const BattleshipGamesDetails = gql`
  fragment BattleshipGamesDetails on BattleshipGame {
    startedBy
    id
    status
    totalShots
    winner
  }
`;

export const ENSDetails = gql`
  fragment ENSDetails on Account {
    domains(first: 1) {
      labelhash
      labelName
      name
      resolver {
        texts
      }
      owner {
        id
      }
    }
  }
`;

// export const ShotDetails = gql`
//   fragment ShotDetails on Shot {
//     id
//     game {
//       id
//     }
//     hit
//   }
// `;
