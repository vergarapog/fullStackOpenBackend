const express = require('express')

const app = express()

app.use(express.json())

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
    {
      "name": "wtfff ",
      "number": "3333333",
      "id": 5
    },
    {
      "name": "tnginamojepy",
      "number": "9999",
      "id": 8
    }
  ]

  app.get('/api/persons', (request,response) => {
      return response.json(persons)
  })

  const PORT = 3001
  app.listen(PORT)
  console.log(`app running on ${PORT}`)