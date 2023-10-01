import { useState, useEffect } from 'react'
import axios from 'axios'

import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const addNote = (e) => {
    e.preventDefault()
    const note = {
      id: notes.length +1,
      content: newNote,
      important: Math.random() < 0.5
    }

    const newNotes = notes.concat(note)
    setNotes(newNotes)
    setNewNote('')
  }
  
  const handleNoteChange = (e) => setNewNote(e.target.value)

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App