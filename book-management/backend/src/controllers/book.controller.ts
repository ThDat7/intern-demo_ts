import { Request, Response } from 'express'
import {
  getBooks as getBooksService,
  getBook as getBookService,
  createBook as createBookService,
  updateBook as updateBookService,
  deleteBook as deleteBookService,
} from '../services/book.services'

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await getBooksService()
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getBook = async (req: Request, res: Response) => {
  try {
    const book = await getBookService(req.params.id)
    res.json(book)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createBook = async (req: Request, res: Response) => {
  try {
    const newBook = await createBookService(req.body)
    res.status(201).json(newBook)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateBook = async (req: Request, res: Response) => {
  try {
    const updatedBook = await updateBookService(req.params.id, req.body)
    res.json(updatedBook)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteBook = async (req: Request, res: Response) => {
  try {
    await deleteBookService(req.params.id)
    res.json({ message: 'Book deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
