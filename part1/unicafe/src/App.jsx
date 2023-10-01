import { useState } from 'react'

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({label, value}) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const getVoteCount = () => good + neutral + bad
  const getPositiveVoteShare = () => (good / getVoteCount() * 100) + "%"
  const getAverageScore = () => (good - bad) / getVoteCount()

  if (!getVoteCount()) {
    return <p>No votes have been cast...</p>
  }

  return (
    <div>
      <h3>Statistics</h3>
      <table>
        <tbody>
        <StatisticLine label="Good" value={good} />
        <StatisticLine label="Neutral" value={neutral} />
        <StatisticLine label="Bad" value={bad} />
        <StatisticLine label="Total votes" value={getVoteCount()} />
        <StatisticLine label="Positive votes" value={getPositiveVoteShare()} />
        <StatisticLine label="Average score" value={getAverageScore()} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementCounter = (val, fn) =>  fn(val + 1)

  return (
    <div>
      <h2>Give your Feedback</h2>
      <Button text="Good" handleClick={() => incrementCounter(good, setGood)} />
      <Button text="Neutral" handleClick={() => incrementCounter(neutral, setNeutral)} />
      <Button text="Bad" handleClick={() => incrementCounter(bad, setBad)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App