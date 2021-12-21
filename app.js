const express = require('express')

const Produto = require('./models/Produto')

const app = express()

app.use(express.json());

app.get('/', async(req, res) => {

  await Produto.findAll({
    attributes: ['cod', 'descricao', 'preco'],
    order: [['cod', 'DESC']]
  })
    .then((produtos) => {
      res.json({
        produtos
      })
    }).catch(() => res.status(400).send('Erro: Nenhum produto foi encontrado!'))

})

app.get('/produto/:cod', async(req, res) => {
  const { cod } = req.params
  
  await Produto.findByPk(cod)
    .then((produto) => {
      res.json({
        Código: cod,
        Produto: produto.descricao,
        Preço: produto.preco
      })
    }).catch(() => res.status(400).json({Mensagem: "Erro: Produto não encontrado!"}))
})

app.post('/cadastrarProduto', async(req, res) => {
  let { descricao, preco } = req.body

  if(!descricao) {
    return res.status(422).json({
      Mensagem: "Erro: O produto precisa conter um nome!"
    })
  }

  const check = await Produto.findOne({ where: { descricao: descricao }})
  console.log(check)
  if(check) {
    return res.status(422).json({
      Mensagem: "Erro: Um produto com este nome já foi cadastrado!"
    })
  }

  await Produto.create({ descricao: descricao, preco: preco })
    .then((produto => {
      res.send('Produto cadastrado com sucesso!')
    })).catch(() => res.status(400).send('Erro: Não foi possível cadastrar esse produto!'))
})

app.put('/produto', async(req, res) => {
  const { cod, descricao } = req.body

  if(!descricao) {
    return res.status(400).json({Mensagem: "Erro: Preencha o nome do produto!"})
  }

  const exist = await Produto.findByPk(cod)
  if(!exist) {
    return res.status(400).json({Mensagem: "Erro: Este produto não existe!"})
  }

  const prodExist = await Produto.findOne({ where: {descricao: descricao} })
  if(prodExist) {
    return res.status(400).json({Mensagem: "Erro: Já existe um produto com este nome!"})
  }

  await Produto.update(req.body, {
    where: {
      cod
    }
  }).then(() => {
    res.json({Mensagem: "Produto atualizado com sucesso!"})
  }).catch(() => res.status(400).json({Mensagem: "Erro: O produto não foi atualizado."}))
})

app.delete('/produto/delete/:cod', async (req, res) => {
  const { cod } = req.params

  const exist = await Produto.findByPk(cod)
  if(!exist) {
    return res.status(400).json({Mensagem: "Erro: Produto não encontrado!"})
  }

  await Produto.destroy({ where: { cod: cod } })
    .then(() => {
      res.json({Mensagem: "Produto excluído com sucesso!"})
    }).catch((err) => {
      res.status(400).json({Mensagem: "Não foi possível excluir este produto!"})
    })
})

app.listen(3000, () => {
  console.log('Servidor iniciado com sucesso na porta 3000!')
})