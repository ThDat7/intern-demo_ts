import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from '../../src/services/book.services'
import * as repository from '../../src/repositories/book.repositories'
import { describe, test, expect, beforeEach, jest } from '@jest/globals'

const mockBooks = [
  { title: 'Book One', author: 'Author One', year: 2021 },
  { title: 'Book Two', author: 'Author Two', year: 2022 },
]

jest.mock('../../src/repositories/book.repositories', () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}))

describe('Book Service Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('getBooks should return all books', async () => {
    ;(repository.findAll as jest.Mock).mockReturnValue(mockBooks)
    const books = await getBooks()

    expect(repository.findAll).toHaveBeenCalledTimes(1)
    expect(books).toEqual(mockBooks)
  })

  test('getBook should return a book by ID', async () => {
    const mockBook = mockBooks[0]
    ;(repository.findById as jest.Mock).mockReturnValue(mockBook)
    const book = await getBook('1')

    expect(repository.findById).toHaveBeenCalledWith('1')
    expect(book).toEqual(mockBook)
  })

  test('createBook should create and return a new book', async () => {
    const newBook = { title: 'New Book', author: 'New Author', year: 2023 }
    ;(repository.save as jest.Mock).mockReturnValue(newBook)
    const book = await createBook(newBook)

    expect(repository.save).toHaveBeenCalledWith(newBook)
    expect(book).toEqual(newBook)
  })

  test('updateBook should update and return the book', async () => {
    const updatedBook = {
      id: '1',
      title: 'Updated Book',
      author: 'Updated Author',
      year: 2024,
    }
    ;(repository.update as jest.Mock).mockReturnValue(updatedBook)
    const book = await updateBook('1', updatedBook)

    expect(repository.update).toHaveBeenCalledWith('1', updatedBook)
    expect(book).toEqual(updatedBook)
  })

  test('deleteBook should delete the book and not return a value', async () => {
    ;(repository.remove as jest.Mock).mockReturnValue(undefined)
    const book = await deleteBook('1')

    expect(repository.remove).toHaveBeenCalledWith('1')
    expect(book).toBeUndefined()
  })
})
