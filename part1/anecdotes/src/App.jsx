import { useState } from 'react'

const Anecdote = ({anecdote, voteCount}) => {
  return (
    <>
      <blockquote>{anecdote}</blockquote>
      <p><em>This anecdote has {voteCount} likes.</em></p>
    </>   
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({
    votes: new Uint8Array(anecdotes.length),
    mostVotes: 0,
    mostVotesIndex: 0
  })

  const randomizeSelected = () => setSelected(Math.floor(Math.random() * (anecdotes.length)))

  const incrementVote = (selected) => {
    const newVotes = {...votes}
    const newVoteCount = newVotes.votes[selected] += 1

    if (newVoteCount > newVotes.mostVotes) {
      newVotes.mostVotes = newVoteCount
      newVotes.mostVotesIndex = selected
    }
    setVotes(newVotes)
  }

  const renderMostPopular = () => {
    return votes.mostVotes ? <Anecdote anecdote={anecdotes[votes.mostVotesIndex]} voteCount={votes.mostVotes}/> : <p>No votes yet...</p>
  }

  return (
    <div>
      <h2>ANECTDOTE OF THE DAY</h2>
      <Anecdote anecdote={anecdotes[selected]} voteCount={votes.votes[selected]}/>
      <button onClick={() => incrementVote(selected)}>Like</button>
      <button onClick={randomizeSelected}>Show other anecdote</button>
      <h2>MOST POPULAR ANECTDOTE</h2>
      {renderMostPopular()}
    </div>
  )
}

export default App