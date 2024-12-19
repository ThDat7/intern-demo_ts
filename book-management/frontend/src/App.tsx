import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import BookList from './components/BookList'
import BookForm from './components/BookForm'

import BookContext from './contexts/BookContext'

function App() {
  const [selectedBook, setSelectedBook] = useState<string | null>(null)

  return (
    <div>
      <h1>Book Store</h1>
      <BookContext.Provider value={{ selectedBook, setSelectedBook }}>
        <BookForm />
        <BookList />
      </BookContext.Provider>
    </div>
  )
}

export default App
