const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_HOSTNAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
})

try {
  sequelize.authenticate()
  console.log('Conexão com o banco de dados estabelecida com sucesso!')
}catch (err) {
  console.error('Não foi possível estabelecer uma conexão com o banco de dados: ', err)
}

module.exports = sequelize