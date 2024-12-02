const { Op } = require('sequelize');

class ProductService {
    constructor(ProductModel) {
        this.Product = ProductModel;
    }

    async create(data) {
        return await this.Product.create(data);
    }

    async findAll() {
        return await this.Product.findAll();
    }

    async findById(id) {
        return await this.Product.findByPk(id);
    }

    async findByName(nome) {
        return await this.Product.findAll({
            where: {
                nome: {
                    [Op.like]: `%${nome}%`, // Busca pelo nome utilizando like
                },
            },
        });
    }

    async update(id, data) {
        const product = await this.Product.findByPk(id);
        if (product) {
            await product.update(data);
            return product;
        }
        return null;
    }

    async delete(id) {
        const product = await this.Product.findByPk(id);
        if (product) {
            await product.destroy();
            return true;
        }
        return false;
    }
}

module.exports = ProductService;
