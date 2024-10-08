class ProductController {
    constructor(ProductService) {
        this.productService = ProductService;
    }

    async createProduct(req, res) {
        const { nome, descricao, preco, estoque } = req.body;
        try {
            const newProduct = await this.productService.create(nome, descricao, preco, estoque);
            res.status(201).json(newProduct);
        } catch (error) {
            res
                .status(500)
                .json({ error: 'Ocorreu um erro ao criar o novo produto.' });
        }
    }

    async findAllProducts(req, res) {
        try {
            const AllProducts = await this.productService.findAll();
                res.status(200).json(AllProducts);
            } catch (error) {
                res
                    .status(500)
                    .json({ error: 'Ocorreu um erro ao listar todos os produtos.' });
        }
    }

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
            res
                .status(500)
                .json({ error: 'Ocorreu um erro ao atualizar o produto.' });
        }
    }

    async deleteProduct(req, res) {
        const { id } = req.body;
        try {
            const deleted = await this.productService.delete(id);
            if (deleted) {
                res.status(200).json({ message: 'Produto deletado com sucesso.' });
            } else {
                res.status(404).json({ error: 'Produto não encontrado.' });
            }
        } catch (error) {
            res
                .status(500)
                .json({ error: 'Ocorreu um erro ao deletar o produto.' });
        }
    }
}

module.exports = ProductController;