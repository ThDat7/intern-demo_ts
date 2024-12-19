import Book, { IBook } from '../models/book.model'

export const findAll = async () => {
  return Book.find()
}

export const findById = async (id: string) => {
  return Book.findById(id)
}

export const save = async (book: IBook) => {
  const newBook = new Book(book)
  return newBook.save()
}

export const update = async (id: string, book: IBook) => {
  return Book.findByIdAndUpdate(id, book, { new: true })
}

export const remove = async (id: string) => {
  return Book.findByIdAndDelete(id)
}
