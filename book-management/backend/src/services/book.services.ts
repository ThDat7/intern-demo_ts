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

export const createBook = async (book: {
  title: string
  author: string
  year: number
}) => {
  return await save(book)
}

export const updateBook = async (
  id: string,
  book: { title: string; author: string; year: number }
) => {
  return await update(id, book)
}

export const deleteBook = async (id: string) => {
  return await remove(id)
}
