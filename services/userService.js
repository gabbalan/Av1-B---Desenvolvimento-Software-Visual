// ./services/userService.js
const auth = require('../auth');
const bcrypt = require('bcrypt');
const db = require('../models');

const round_salts = 10;

class UserService {
    constructor(UserModel) {
        this.User = UserModel;
    }

    async create(email, data_nasc, password) {
        try {
            const hashPassword = await bcrypt.hash(password, parseInt(round_salts));
            const newUser = await this.User.create({
                email: email,
                data_nasc: data_nasc,
                password: hashPassword,
            });
            return newUser ? newUser : null;
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    }

    async findAll() {
        try {
            const AllUsers = await this.User.findAll();
            return AllUsers ? AllUsers : null;
        } catch (error) {
            console.error('Erro ao buscar todos os usuários:', error);
            throw error;
        }
    }

    async findById(id) {
        try {
            const User = await this.User.findByPk(id);
            return User ? User : null;
        } catch (error) {
            console.error('Erro ao buscar usuário por ID:', error);
            throw error;
        }
    }

    async login(email, password) {
        try {
            const User = await this.User.findOne({ where: { email } });
            if (User) {
                if (await bcrypt.compare(password, User.password)) {
                    const token = await auth.generateToken(User);
                    User.dataValues.Token = token;
                    User.dataValues.password = ''; // Remove a senha antes de retornar
                } else {
                    throw new Error('Senha inválida.');
                }
            }
            return User ? User : null;
        } catch (error) {
            console.error('Erro no login:', error);
            throw error;
        }
    }
}

module.exports = UserService;
