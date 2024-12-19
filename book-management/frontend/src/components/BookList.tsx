import React, { useEffect, useState, useContext } from 'react'
import Book from '../types/Book'
import { Button, Table } from 'react-bootstrap'
import { getBooks, deleteBook } from '../services/api'
import { useBookContext } from '../contexts/BookContext'

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([])
  const { selectedBook, setSelectedBook } = useBookContext()

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooks()
      setBooks(data)
    }

    fetchBooks()
  }, [])

  const handleDelete = async (id: string) => {
    await deleteBook(id)
    setBooks(books.filter((book) => book._id !== id))
  }

  const handleSelect = (id: string) => {
    if (selectedBook === id) setSelectedBook('')
    else setSelectedBook(id)
  }

  return (
    <div>
      <h2>Books</h2>

      <Table hover bordered striped>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {books.map((book: Book, index: number) => {
            return (
              <tr key={index}>
                <td>
                  <input
                    type='checkbox'
                    checked={book._id === selectedBook}
                    onClick={() => handleSelect(book._id)}
                  />
                </td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>
                  <Button
                    variant='danger'
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default BookList
