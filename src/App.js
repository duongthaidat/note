import React, { useEffect } from 'react'
import { useState } from 'react';
import { nanoid } from 'nanoid'
import NotesList from './component/NotesList';
import Search from './component/Search';
import Header from './component/Header';

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first note!",
      date: "15/04/2021"
    },
    {
      id: nanoid(),
      text: "This is my second note!",
      date: "16/04/2021"
    },

    {
      id: nanoid(),
      text: "This is my third note!",
      date: "25/04/2021"
    },


  ]);

  const [searchText, setSearchText] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const saveNote = JSON.parse(
      localStorage.getItem('react-note-app-data'))
      if (saveNote){
        setNotes(saveNote)
      }
  }, [])

  useEffect(() => {
    localStorage.setItem('react-notes-app-data',
      JSON.stringify(notes))
  }, [notes])

  const addNote = (text) => {
    const date = new Date()
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote]
    setNotes(newNotes)
  }
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id)
    setNotes(newNotes)
  }
  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className='container'>
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  )
}
export default App;