const express = require ('express')
const app = express()
const db = require ('./db.js')
const PORT = 3000

//PUBLIC FILES FOR CSS 
const path = require ('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

// ENCRYPTION
const crypto = require('crypto')

//INSTALLING MORGAN FOR LOGIN
const morgan = require ('morgan')
app.use(morgan ('dev'))

//UNKNOWN FOUNDATION
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//IMPORT EJS
app.set('view engine', 'ejs')



//PART A GENERAL ROUTERS
app.get('/', (req, res) => {
    //console.log(res)
    res.render('pages/app')
}) 

app.get('/users', (req, res) => {
    res.render('pages/users', {
        users: db.users
    })
}) 

app.get('/schedules', (req, res) => {
    res.render('pages/schedules', {
        schedules: db.schedules
    })
}) 


//PART B SPECIFIC ROUTERS
app.get('/users/:id', (req, res) => {
    res.render('pages/users', {
        users: db.users[req.params.id]
    })
}) 

app.get('/users/:id/schedules', (req, res) => {
    const appointment = []
    for (let i = 0; i < db.schedules.length; i++) {
        if (db.schedules[i].user_id == req.params.id) {
        appointment.push(db.schedules[i])
        }
    }
    res.render('pages/your-schedule', {
        users: db.users[req.params.id],
        schedules: appointment
    })
})



//NEW SPECIFIC ROUTERS
app.get('/users/new', (req, res) => {
    res.render('pages/new-user')
})

app.get('/schedules/new', (req, res) => {
    res.render('pages/new-schedule', {
    })
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
    res.redirect('/users')
})

app.post('/schedules', (req, res) => {
    const newSchedule = {
      user_id: Number(req.body.user_id),
      day: Number(req.body.day),
      start_at: req.body.start_at,
      end_at: req.body.end_at
    }
    db.schedules.push(newSchedule)
    res.redirect('/schedules')
})


  
//PORT LISTENER
app.listen(PORT, () => {
    console.log(`server is listening on localhost:${PORT}!\n`)
})
