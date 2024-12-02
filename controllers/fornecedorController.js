class FornecedorController {
    constructor(FornecedorService) {
        this.fornecedorService = FornecedorService;
    }

    async createFornecedor(req, res) {
        const { nome, cnpj, endereco, produtoFornecido } = req.body;
        try {
            const fornecedor = await this.fornecedorService.create({ nome, cnpj, endereco, produtoFornecido });
            res.status(201).json(fornecedor);
        } catch (error) {
            console.error('Erro ao criar fornecedor:', error);
            res.status(500).json({ error: 'Erro ao criar fornecedor.' });
        }
    }

    async getAllFornecedores(req, res) {
        try {
            const fornecedores = await this.fornecedorService.findAll();
            res.status(200).json(fornecedores);
        } catch (error) {
            console.error('Erro ao listar fornecedores:', error);
            res.status(500).json({ error: 'Erro ao listar fornecedores.' });
        }
    }

    async getFornecedorByCnpj(req, res) {
        const { cnpj } = req.query;
        try {
            const fornecedor = await this.fornecedorService.findByCnpj(cnpj);
            if (!fornecedor) {
                return res.status(404).json({ error: 'Fornecedor não encontrado.' });
            }
            res.status(200).json(fornecedor);
        } catch (error) {
            console.error('Erro ao buscar fornecedor por CNPJ:', error);
            res.status(500).json({ error: 'Erro ao buscar fornecedor.' });
        }
    }
}

module.exports = FornecedorController;
