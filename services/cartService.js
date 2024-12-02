const db = require('../models');

class CartService {
    async addItem(userId, productId, quantidade) {
        try {
            const cart = await db.Cart.findOne({ where: { userId } });
            if (!cart) throw new Error('Carrinho não encontrado.');

            const product = await db.Product.findByPk(productId);
            if (!product) throw new Error('Produto não encontrado.');

            const cartItem = await db.CartItem.create({
                cartId: cart.id,
                productId,
                quantidade,
                precoUnitario: product.preco,
                precoTotal: product.preco * quantidade,
            });

            return cartItem;
        } catch (error) {
            console.error('Erro ao adicionar item ao carrinho:', error.message);
            throw error;
        }
    }

    async removeItem(userId, cartItemId) {
        try {
            const cart = await db.Cart.findOne({ where: { userId } });
            if (!cart) throw new Error('Carrinho não encontrado.');

            const cartItem = await db.CartItem.findOne({
                where: { id: cartItemId, cartId: cart.id },
            });
            if (!cartItem) throw new Error('Item não encontrado.');

            await cartItem.destroy();
            return { message: 'Item removido com sucesso!' };
        } catch (error) {
            console.error('Erro ao remover item do carrinho:', error.message);
            throw error;
        }
    }

    async clearCart(userId) {
        try {
            const cart = await db.Cart.findOne({ where: { userId } });
            if (!cart) throw new Error('Carrinho não encontrado.');

            await db.CartItem.destroy({ where: { cartId: cart.id } });
        } catch (error) {
            console.error('Erro ao limpar o carrinho:', error.message);
            throw error;
        }
    }

    async getCart(userId) {
        try {
            const cart = await db.Cart.findOne({
                where: { userId },
                include: [
                    {
                        model: db.CartItem,
                        as: 'items',
                        include: [
                            {
                                model: db.Product,
                                as: 'product',
                            },
                        ],
                    },
                ],
            });

            if (!cart) throw new Error('Carrinho não encontrado.');

            return cart.items.map(item => ({
                id: item.id,
                nome: item.product.nome,
                descricao: item.product.descricao,
                precoUnitario: item.product.preco,
                quantidade: item.quantidade,
            }));
        } catch (error) {
            console.error('Erro ao buscar o carrinho:', error.message);
            throw error;
        }
    }
}

module.exports = CartService;
