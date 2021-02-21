const express = require ('express')
const app = express()
const path = require ('path')
const PORT = 4000


//INSTALLING MORGAN FOR LOGIN
const morgan = require ('morgan')
app.use(morgan ('dev'))
app.use('/static', express.static(path.join(__dirname, 'public')))

//UNKNOWN FOUNDATIONapp.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//IMPORT EJS
app.set('view engine', 'ejs')

//DATABASE
const dataBase = require('./database')

app.get('/', (req, res) => {
    database.any('SELECT FROM * schedule;')
    .then((schedule) => {
        res.render('pages/app', {
            schedule: schedule
        })
    .catch((err) => {
        res.render('page/error', {
            err: err
        })
        
    })
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

//DATA PUSH

  
//PORT LISTENER
app.listen(PORT, () => {
    console.log(`server is listening on localhost:${PORT}!\n`)
})