import Book from '../models/book.model'

export const findAll = async () => {
  return Book.find()
}

export const findById = async (id: string) => {
  return Book.findById(id)
}

export const save = async (book: {
  title: string
  author: string
  year: number
}) => {
  const newBook = new Book(book)
  return newBook.save()
}

export const update = async (
  id: string,
  book: { title: string; author: string; year: number }
) => {
  return Book.findByIdAndUpdate(id, book, { new: true })
}

export const remove = async (id: string) => {
  return Book.findByIdAndDelete(id)
}
