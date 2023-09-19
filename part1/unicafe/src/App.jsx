import { useState } from 'react'
const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>
}
const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  )
}
const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>
  }
  return (
    <>
      <p>all {good + neutral + bad}</p>
      <p>average {(good + neutral + bad) / 3}</p>
      <p>positive {(good * 100) / (good + neutral + bad)}</p>
    </>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <h2>statistics</h2>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
