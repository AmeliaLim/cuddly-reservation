//CONNECTING POSTRES

const pgp = require ('pg-promise')()

const connection = 'postgres://braedanbolt@localhost:5432/mrcoffee_app'

const database = pgp (connection)