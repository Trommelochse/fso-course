import { useState, useEffect } from 'react'
import noteService from './services/noteService'

import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  useEffect(() => {
    noteService.getAll()
      .then(notes => {        
        setNotes(notes)
      })
  }, [])

  const addNote = (e) => {
    e.preventDefault()
    const note = {
      content: newNote,
      important: Math.random() < 0.5
    }

    noteService
      .create(note)
      .then(note => {
        const newNotes = notes.concat(note)
        setNotes(newNotes)
        setNewNote('')
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(note => {
        setNotes(notes.map(n => n.id !== id ? n : note))
      })
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
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
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