import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

export const getBooks = async () => {
  const response = await axios.get(`${API_URL}/books`)
  return response.data
}

export const getBook = async (id: string) => {
  const response = await axios.get(`${API_URL}/books/${id}`)
  return response.data
}

export const createBook = async (book: {
  title: string
  author: string
  year: number
}) => {
  const response = await axios.post(`${API_URL}/books`, book)
  return response.data
}

export const updateBook = async (
  id: string,
  book: { title: string; author: string; year: number }
) => {
  const response = await axios.put(`${API_URL}/books/${id}`, book)
  return response.data
}

export const deleteBook = async (id: string) => {
  await axios.delete(`${API_URL}/books/${id}`)
}
