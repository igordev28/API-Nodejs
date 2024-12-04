const express = require('express');
const app = express();

// requisições como JSON
app.use(express.json());


let produtos = [
    { id: 1, nome: 'Placa de vídeo RTX 4090', quantidade: 10, preco: 8000.0 },
    { id: 2, nome: 'Processador Ryzen 9 9500x', quantidade: 5, preco: 6550.0 },
];

// Consultar todos os produtos
app.get('/produtos', (req, res) => {
    res.status(200).json(produtos);
});

//  Consultar um produto pelo ID
app.get('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const produto = produtos.find(p => p.id == id);

    if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.status(200).json(produto);
});

// Inserir um novo produto
app.post('/produtos', (req, res) => {
    const { nome, quantidade, preco } = req.body;
    const id = produtos.length ? produtos[produtos.length - 1].id + 1 : 1;

    if (!nome || !quantidade || !preco) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const novoProduto = { id, nome, quantidade, preco };
    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
});

//  Alterar os dados de um produto
app.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, quantidade, preco } = req.body;

    const produto = produtos.find(p => p.id == id);

    if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Atualizando os dados
    produto.nome = nome !== undefined ? nome : produto.nome;
    produto.quantidade = quantidade !== undefined ? quantidade : produto.quantidade;
    produto.preco = preco !== undefined ? preco : produto.preco;

    res.status(200).json(produto);
});

// Deletar um produto
app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const index = produtos.findIndex(p => p.id == id);

    if (index === -1) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }

    produtos.splice(index, 1);
    res.status(200).json({ message: 'Produto deletado com sucesso' });
});

// Iniciar o servidor
const PORT = 3020;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
