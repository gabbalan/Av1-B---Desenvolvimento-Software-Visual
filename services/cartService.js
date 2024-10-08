const db = require('../models');

class CartService {
  constructor(CartModel, CartItemModel, ProductModel, UserModel) {
    this.Cart = CartModel;
    this.CartItem = CartItemModel;
    this.Product = ProductModel;
    this.User = UserModel;
  }

  async addToCart(userId, productId, quantidade) {
    try {
      let cart;
      if (userId) {
        const user = await this.User.findByPk(userId);
        if (!user) throw new Error('Usuário não encontrado');
        cart = await this.Cart.findOne({ where: { userId } });
      }
      
      if (!cart) {
        cart = await this.Cart.create({ userId: userId || null });
      }

      const product = await this.Product.findByPk(productId);
      if (!product) throw new Error('Produto não encontrado');

      const precoTotal = product.preco * quantidade;

      let cartItem = await this.CartItem.findOne({
        where: { cartId: cart.id, productId }
      });

      if (cartItem) {
        cartItem.quantidade += quantidade;
        cartItem.precoTotal += precoTotal;
        await cartItem.save();
      } else {
        cartItem = await this.CartItem.create({
          cartId: cart.id,
          productId,
          quantidade,
          precoTotal
        });
      }

      return cartItem;
    } catch (error) {
      throw error;
    }
  }

  async removeFromCart(userId, cartItemId) {
    try {
      const cart = await this.Cart.findOne({ where: { userId } });
      if (!cart) {
        throw new Error('Carrinho não encontrado para este usuário');
      }
  
      const cartItem = await this.CartItem.findOne({
        where: { 
          id: cartItemId,
          cartId: cart.id
        }
      });
  
      if (!cartItem) {
        throw new Error('Item não encontrado no carrinho deste usuário');
      }
  
      await cartItem.destroy();
  
      return { message: 'Item removido do carrinho com sucesso' };
    } catch (error) {
      console.error('Erro ao remover item:', error);
      throw error;
    }
  }

  async getCart(userId) {
    try {
      const cart = await this.Cart.findOne({
        where: { userId },
        include: [
          {
            model: this.CartItem,
            as: 'items',
            include: [
              {
                model: this.Product,
                as: 'product'
              }
            ]
          }
        ]
      });
  
      if (!cart) return null;
  
      return {
        id: cart.id,
        userId: cart.userId,
        items: cart.items.map(item => ({
          id: item.id,
          productName: item.product.nome,
          quantidade: item.quantidade,
          precoUnitario: parseFloat(item.product.preco),
          precoTotal: parseFloat(item.precoTotal)
        })),
        valorTotal: cart.items.reduce((total, item) => total + parseFloat(item.precoTotal), 0)
      };
    } catch (error) {
      throw error;
    }
  }

  async getCartTotal(userId) {
    try {
      const cart = await this.Cart.findOne({
        where: { userId },
        include: [{
          model: this.CartItem,
          as: 'items',
          include: [{
            model: this.Product,
            as: 'product'
          }]
        }]
      });

      if (!cart) {
        throw new Error('Carrinho não encontrado');
      }

      const total = cart.items.reduce((sum, item) => sum + (item.quantidade * item.product.preco), 0);
      return total;
    } catch (error) {
      throw error;
    }
  }

  async clearCart(userId) {
    const cart = await this.Cart.findOne({ where: { userId } });
    if (cart) {
      await this.CartItem.destroy({ where: { cartId: cart.id } });
    }
  }
}

module.exports = CartService;
