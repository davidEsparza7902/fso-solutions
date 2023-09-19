import { useState } from 'react'
const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>
}
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <tr>
        <td>No feedback given</td>
      </tr>
    )
  }
  return (
    <>
      <StatisticLine text="all" value={good + neutral + bad} />
      <StatisticLine text="average" value={(good + neutral + bad) / 3} />
      <StatisticLine
        text="positive"
        value={(good * 100) / (good + neutral + bad)}
      />
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
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <Statistics good={good} neutral={neutral} bad={bad} />
        </tbody>
      </table>
    </div>
  )
}

export default App
