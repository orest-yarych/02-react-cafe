import { useState } from 'react';
import CafeInfo from '../CafeInfo/CafeInfo';
import css from './App.module.css';
import type { Votes } from '../../types/votes';
import type { VoteType } from '../../types/votes';
import VoteOptions from '../VoteOptions/VoteOptions';
import VoteStats from '../VoteStats/VoteStats';
import Notification from '../Notification/Notification';

function App() {
  const initVotes = {
    good: 0,
    neutral: 0,
    bad: 0,
  };
  const [votes, setVotes] = useState<Votes>({ ...initVotes });

  function handleVote(type: VoteType) {
    setVotes({ ...votes, [type]: votes[type] + 1 });
  }

  function resetVotes() {
    setVotes({ ...initVotes });
  }

  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      />
      {totalVotes ? (
        <VoteStats
          votes={votes}
          positiveRate={positiveRate}
          totalVotes={totalVotes}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;
