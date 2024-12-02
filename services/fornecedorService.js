class FornecedorService {
    constructor(FornecedorModel) {
        this.Fornecedor = FornecedorModel;
    }

    async create(data) {
        return await this.Fornecedor.create(data);
    }

    async findAll() {
        return await this.Fornecedor.findAll();
    }

    async findByCnpj(cnpj) {
        return await this.Fornecedor.findOne({ where: { cnpj } });
    }
}

module.exports = FornecedorService;
