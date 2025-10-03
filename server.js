import { users } from '#routes'
import cors from 'cors'
import express from 'express'

const PORT = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(express.json())
app.use('/user', users)
app.get("/", (req, res) => res.type('html').send(html));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>IntelliDriver API</title>
  </head>
  <body>
    <h1>teste da api do intellidriver</h1>
    <h2>funcionando pelo que parece</h2>
  </body>
</html>
`