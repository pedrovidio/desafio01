const express = require('express')

const server = express()
var cont = 0
server.use(express.json())

server.use((req, use, next) => {
  cont++;
  console.log(`Contador: ${cont}`)

  return next()
})

function check(req, res, next)
{
  const { id } = req.params;

  const index = projects.findIndex(proj => proj.id == id);

  if(index === -1)
  {
    return res.send('Por favor, envie um valor de ID existente')
  }

  return next()
}


const projects = [
  {
    "id": 1,
    "title": "Projeto 1",
    "tasks":["teste"]
  },
  {
    "id": 2,
    "title": "Projeto 2",
    "tasks":["teste"]
  },
  {
    "id": 3,
    "title": "Projeto 3",
    "tasks":["teste"]
  }
];

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
});

server.delete('/projects/:id', check, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(proj => proj.id == id);

 projects.splice(index, 1)

  return res.json(projects);
});

server.get('/projects', (req, res) => { 
  return res.json(projects)
})

server.put('/projects/:id', check, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const index = projects.findIndex(proj => proj.id == id);

  if(index === -1)
  {
    return res.json({ error: "Project not found."})
  }
  else
  {
    projects[index].title = title
  }

  return res.json(projects);
});


server.listen(3000)