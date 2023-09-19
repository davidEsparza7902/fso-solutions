const Header = ({ course }) => {
  return <h1>{course}</h1>
}
const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  )
}
const Total = ({ parts }) => {
  let total = 0
  parts.forEach((part) => {
    total += part.exercises
  })
  return <h2>Total of {total} exercises</h2>
}
const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
      {
        name: 'Redux',
        exercises: 11,
      },
    ],
  }

  return <Course course={course} />
}

export default App
