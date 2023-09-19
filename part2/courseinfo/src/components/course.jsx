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
  let total = parts.reduce((sum, part) => sum + part.exercises, 0)
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
export default Course
