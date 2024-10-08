const db = require('../models');

class ProductService {
    constructor(ProductModel) {
        this.Product = ProductModel;
    }

    async create(nome, descricao, preco, estoque) {
        try {
            const newProduct = await this.Product.create({
                nome: nome,
                descricao: descricao,
                preco: preco,
                estoque: estoque
            });
            return newProduct ? newProduct : null;
        }
        catch (error) {
            throw error;
        }
    }

    async findAll() {
        console.log('Método findAll do serviço chamado');
        try {
            const AllProducts = await this.Product.findAll();
            console.log('Produtos retornados do banco:', AllProducts);
            return AllProducts ? AllProducts : null;
        }
        catch (error) {
            console.error('Erro no serviço:', error);
            throw error;
        }
    }

    // Método para atualizar um produto
    async update(id, productData) {
        try {
            const Product = await this.Product.findByPk(id);
            if (Product) {
                await Product.update(productData);
                return Product;
            }
            return null;
        }
        catch (error) {
            throw error;
        }
    }

    // Método para deletar um produto
    async delete(id) {
        try {
            const Product = await this.Product.findByPk(id);
            if (Product) {
                await Product.destroy();
                return true;
            }
            return false;
        }
        catch (error) {
            throw error;
        }
    }
}

module.exports = ProductService;
