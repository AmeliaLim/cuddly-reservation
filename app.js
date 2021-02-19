const express = require ('express')
const app = express()

const PORT = 3000
const db = require ('./db.js')

// ENCRYPTION
const crypto = require('crypto')

//INSTALLING MORGAN FOR LOGIN
const morgan = require ('morgan')
app.use(morgan ('dev'))

//??
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//IMPORT EJS
app.set('view engine', 'ejs')

//Part A INITIAL ROUTES
app.get('/', (req, res) => {
    //console.log(res)
    res.render('pages/app')
}) 

app.get('/users', (req, res) => {
    res.json(db.userName)
}) 

app.get('/shedules', (req, res) => {
    res.json(db.planner)
}) 

//Part B PARAMS ROUTES

app.get('/users/:id', (req, res) => {
    //console.log(req.params.id)
    res.send(db.users[req.params.id])
}) 

app.get('/users/:id/schedules', (req, res) => {
    res.json(db.userName)
})

app.get('/users/:id/schedules', (req, res) => {
    const appointment = []
    for (let i = 0; i < db.schedules.length; i++) {
        if (db.schedules[i].user_id == req.params.id) {
        appointment.push(db.schedules[i])
        }
    }
    res.send(appointment)
})

//PART C NEW DATA INPUT

app.post('/users', (req, res) => {
    const hashSymbols = crypto.createHash('sha256').update(req.body.password).digest('hex')
    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashSymbols
    }
    db.users.push(newUser)
    res.send('well well new user welcome')
})

app.post('/schedules', (req, res) => {
    const newSchedule = {
      user_id: Number(req.body.user_id),
      day: Number(req.body.day),
      start_at: req.body.start_at,
      end_at: req.body.end_at
    }
    db.schedules.push(newSchedule)
    res.send('well well i shall see you later?')
})
  
  
app.listen(PORT, () => {
    console.log(`server is listening on localhost:${PORT}!\n`)
})