import express from 'express'
import cors from 'cors'
import mongoose, { ConnectOptions } from 'mongoose'
import bookRoutes from './routes/book.routes'

const app = express()
const port = process.env.PORT || 5000
const mongoUri = 'mongodb://localhost:27017/bookstore'

app.use(cors())
app.use(express.json())

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err))

app.use('/api', bookRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
