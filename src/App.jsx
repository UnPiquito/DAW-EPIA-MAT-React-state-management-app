import React, { useState } from "react";
import { Buttons } from "./buttons.jsx";
import Statistics from "./statistics.jsx";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const totalFeedback = good + neutral + bad;
  const averageScore = totalFeedback === 0 ? 0 : (good - bad) / totalFeedback;
  const positivePercentage =
    totalFeedback === 0 ? 0 : (good / totalFeedback) * 100;

  const anecdoteList = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selectedAnecdoteIndex, setSelectedAnecdoteIndex] = useState(0);
  const [selectedAnecdote, setSelectedAnecdote] = useState(
    anecdoteList[selectedAnecdoteIndex]
  );
  const [anecdoteVotes, setAnecdoteVotes] = useState(
    new Array(anecdoteList.length).fill(0)
  );

  const handleSelect = () => {
    const newSelectedIndex = Math.floor(Math.random() * anecdoteList.length);
    setSelectedAnecdoteIndex(newSelectedIndex);
    setSelectedAnecdote(anecdoteList[newSelectedIndex]);
  };

  const handleVoteAnecdote = () => {
    const newVotes = [...anecdoteVotes];
    newVotes[selectedAnecdoteIndex]++;
    setAnecdoteVotes(newVotes);
  };

  const maxVotes = Math.max(...anecdoteVotes);
  const maxIndices = anecdoteVotes.reduce((acc, vote, index) => {
    if (vote === maxVotes) {
      acc.push(index);
    }
    return acc;
  }, []);

  return (
    <div>
      <div>
        <h2>Feedback</h2>
        <Buttons text="good" handleClick={() => setGood(good + 1)} />
        <Buttons text="neutral" handleClick={() => setNeutral(neutral + 1)} />
        <Buttons text="bad" handleClick={() => setBad(bad + 1)} />
      </div>

      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <tr>
              <td>Good</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>Neutral</td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>Bad</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{totalFeedback}</td>
            </tr>
            <tr>
              <td>Average</td>
              <td>{averageScore}</td>
            </tr>
            <tr>
              <td>Positive</td>
              <td>{`${positivePercentage} %`}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>{selectedAnecdote}</p>
      <p>has {anecdoteVotes[selectedAnecdoteIndex]} votes</p>
      <button onClick={handleVoteAnecdote}>vote</button>
      <button onClick={handleSelect}>next anecdote</button>

      <h2>Anecdote with the most votes</h2>
      <p>{anecdoteList[maxIndices[0]]}</p>
      <p>has {maxVotes} votes</p>
    </div>
  );
};

export default App;
