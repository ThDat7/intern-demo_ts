import React, { useState, useEffect } from 'react'
import { createBook, getBook, updateBook } from '../services/api'
import { useBookContext } from '../contexts/BookContext'
import { Button, Form } from 'react-bootstrap'

const BookForm: React.FC = () => {
  const { selectedBook } = useBookContext()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState(0)

  useEffect(() => {
    const fetchBook = async () => {
      if (selectedBook) {
        try {
          const data = await getBook(selectedBook)
          setTitle(data.title)
          setAuthor(data.author)
          setYear(data.year)
        } catch (error) {
          console.error(error)
        }
      } else {
        setTitle('')
        setAuthor('')
        setYear(0)
      }
    }

    fetchBook()
  }, [selectedBook])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const book = { title, author, year }
      if (selectedBook) await updateBook(selectedBook, book)
      else await createBook(book)

      setTitle('')
      setAuthor('')
      setYear(0)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Form.Control
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Title'
        required
      />
      <Form.Control
        type='text'
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder='Author'
        required
      />
      <Form.Control
        type='number'
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        placeholder='Year'
        required
      />
      <Button type='submit' variant='primary'>
        Submit
      </Button>
    </form>
  )
}

export default BookForm
