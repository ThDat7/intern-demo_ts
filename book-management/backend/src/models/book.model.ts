import mongoose, { Schema, Document } from 'mongoose'

export interface IBook extends Document {
  title: string
  author: string
  year: number
}

const bookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true }
)

const Book = mongoose.model<IBook>('Book', bookSchema)
export default Book
