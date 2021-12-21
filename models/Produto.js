const { Sequelize, Datatypes } = require('sequelize')
const db = require('./db')

const Produto = db.define('produto', {
  cod: {
    allowNull: false,
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  descricao: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  preco: {
    type: Sequelize.DOUBLE
  }
})

Produto.sync()

module.exports = Produto