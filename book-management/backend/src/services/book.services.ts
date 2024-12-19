import { IBook } from '../models/book.model'
import {
  findAll,
  findById,
  save,
  update,
  remove,
} from '../repositories/book.repositories'

export const getBooks = async () => {
  return await findAll()
}

export const getBook = async (id: string) => {
  return await findById(id)
}

export const createBook = async (book: IBook) => {
  return await save(book)
}

export const updateBook = async (id: string, book: IBook) => {
  return await update(id, book)
}

export const deleteBook = async (id: string) => {
  return await remove(id)
}
