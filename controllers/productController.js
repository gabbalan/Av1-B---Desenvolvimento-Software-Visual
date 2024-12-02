class ProductController {
    constructor(productService) {
        this.productService = productService;
    }

    // Criação de um novo produto
    async createProduct(req, res) {
        const { nome, descricao, preco, estoque } = req.body;
        try {
            const product = await this.productService.create({ nome, descricao, preco, estoque });
            res.status(201).json(product);
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            res.status(500).json({ error: 'Erro ao criar o produto.' });
        }
    }

    // Listar todos os produtos ou buscar por nome/ID
    async findAllProducts(req, res) {
        const { nome, id } = req.query; // Pega os parâmetros da requisição
        try {
            let products;
            if (id) {
                products = await this.productService.findById(id); // Busca por ID
            } else if (nome) {
                products = await this.productService.findByName(nome); // Busca por Nome
            } else {
                products = await this.productService.findAll(); // Busca todos os produtos
            }
            res.status(200).json(products);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            res.status(500).json({ error: 'Erro ao buscar produtos.' });
        }
    }

    // Atualizar um produto existente
    async updateProduct(req, res) {
        const { id, nome, descricao, preco, estoque } = req.body;
        try {
            const updatedProduct = await this.productService.update(id, { nome, descricao, preco, estoque });
            if (updatedProduct) {
                res.status(200).json(updatedProduct);
            } else {
                res.status(404).json({ error: 'Produto não encontrado.' });
            }
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            res.status(500).json({ error: 'Erro ao atualizar o produto.' });
        }
    }

    // Deletar um produto
    async deleteProduct(req, res) {
        const { id } = req.body;
        if (!id) {
            res.status(400).json({ error: 'ID do produto não fornecido.' });
            return;
        }
        try {
            const deleted = await this.productService.delete(id);
            if (deleted) {
                res.status(200).json({ message: 'Produto deletado com sucesso.' });
            } else {
                res.status(404).json({ error: 'Produto não encontrado.' });
            }
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            res.status(500).json({ error: 'Erro ao deletar o produto.' });
        }
    }
}

module.exports = ProductController;
