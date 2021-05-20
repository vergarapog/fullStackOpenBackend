const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(cors());

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "wtfff ",
    number: "3333333",
    id: 5,
  },
  {
    name: "tnginamojepy",
    number: "9999",
    id: 8,
  },
];

app.get("/api/persons", (request, response) => {
  return response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => {
    return p.id === id;
  });

  if (person) {
    return response.json(person);
  } else {
    return response.status(404).end();
  }
});

app.get("/info", (request, response) => {
  let num = persons.length;
  let time = new Date();
  return response.send(`Phonebook has info for ${num} persons<br/><br/>
      ${time}`);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((note) => note.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const id = Math.floor(Math.random() * 10000) + 1;
  return id;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  const allNames = persons.map((p) => p.name);
  console.log(allNames);

  if (allNames.includes(body.name)) {
    return response.status(400).json({
      error: "name already exists",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);
  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`app running on ${PORT}`);
