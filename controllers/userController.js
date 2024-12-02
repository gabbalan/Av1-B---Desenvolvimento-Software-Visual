class UserController {
    constructor(UserService) {
        this.userService = UserService;
    }

    async createUser(req, res) {
        const { email, data_nasc, password } = req.body;
        try {
            const newUser = await this.userService.create(email, data_nasc, password);
            if (!newUser) {
                res.status(400).json({ error: 'Erro ao criar o usuário.' });
                return; // Impede execução adicional
            }
            res.status(201).json(newUser); // Envia a resposta e encerra
        } catch (error) {
            console.error('Erro ao criar usuário:', error.message || error);
            // Responde apenas se ainda não enviou uma resposta
            if (!res.headersSent) {
                res.status(500).json({ error: 'Ocorreu um erro ao gravar o novo usuário.' });
            }
        }
    }

    async findAllUsers(req, res) {
        try {
            const allUsers = await this.userService.findAll();
            if (!allUsers || allUsers.length === 0) {
                res.status(404).json({ error: 'Nenhum usuário encontrado.' });
                return;
            }
            res.status(200).json(allUsers);
        } catch (error) {
            console.error('Erro ao buscar todos os usuários:', error.message || error);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Ocorreu um erro ao localizar todos os usuários.' });
            }
        }
    }

    async findUserById(req, res) {
        const { id } = req.query;
        if (!id) {
            res.status(400).json({ error: 'O ID do usuário é obrigatório.' });
            return;
        }
        try {
            const user = await this.userService.findById(id);
            if (!user) {
                res.status(404).json({ error: 'Usuário não encontrado.' });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Erro ao buscar usuário por ID:', error.message || error);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Ocorreu um erro ao localizar o usuário pelo ID.' });
            }
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email e senha são obrigatórios.' });
            return;
        }
        try {
            const user = await this.userService.login(email, password);
            if (!user) {
                res.status(401).json({ error: 'Credenciais inválidas.' });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Erro ao logar usuário:', error.message || error);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Erro ao logar o usuário.' });
            }
        }
    }
}

module.exports = UserController;
