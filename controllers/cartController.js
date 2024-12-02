const CartService = require('../services/cartService');
const db = require('../models');

const cartService = new CartService(db);

class CartController {
    async addToCart(req, res) {
        const { userId, productId, quantidade } = req.body;
        try {
            const cartItem = await cartService.addItem(userId, productId, quantidade);
            res.status(201).json(cartItem);
        } catch (error) {
            console.error('Erro ao adicionar item ao carrinho:', error.message);
            res.status(400).json({ error: error.message });
        }
    }

    async removeFromCart(req, res) {
        const { userId, cartItemId } = req.params;
        if (!userId || !cartItemId) {
            return res.status(400).json({ error: 'Parâmetros inválidos.' });
        }

        try {
            const result = await cartService.removeItem(userId, cartItemId);
            res.status(200).json(result);
        } catch (error) {
            console.error('Erro ao remover item do carrinho:', error.message);
            res.status(400).json({ error: error.message });
        }
    }

    async getCart(req, res) {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ error: 'Parâmetro userId é obrigatório.' });
        }

        try {
            const cart = await cartService.getCart(userId);
            res.status(200).json(cart);
        } catch (error) {
            console.error('Erro ao buscar o carrinho:', error.message);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new CartController();
