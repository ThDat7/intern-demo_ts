import { Request, Response } from 'express'
import Book, { IBook } from '../models/book.model'

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find()
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id)
    res.json(book)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createBook = async (req: Request, res: Response) => {
  const { title, author, year }: IBook = req.body
  const newBook = new Book({ title, author, year })

  try {
    await newBook.save()
    res.status(201).json(newBook)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateBook = async (req: Request, res: Response) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(updatedBook)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteBook = async (req: Request, res: Response) => {
  try {
    await Book.findByIdAndDelete(req.params.id)
    res.json({ message: 'Book deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
