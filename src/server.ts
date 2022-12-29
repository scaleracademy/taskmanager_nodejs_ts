import express, { json } from 'express'
import { taskRoute } from './routes/task.route';
import { notesRoute } from './routes/note.route';
const app = express()

app.use(json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/tasks', taskRoute)
app.use('/tasks', notesRoute)

app.listen(4747, () => {
  console.log('Server is running on http://localhost:4747/')
})