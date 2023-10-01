const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => 
  <div>
    {parts.map((part) => <Part key={part.id} part={part} />)} 
  </div>

const Total = ({count}) => <p><strong>Total of {count} exercises</strong></p>

const Course = ({course}) => {
  const getExerciseCount = () => {
    return course.parts.reduce((acc, curr) => acc + curr.exercises, 0)
  }

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total count={getExerciseCount()} />
    </>
  )
}

export default Course