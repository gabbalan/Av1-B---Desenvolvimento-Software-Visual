class CartController {
    constructor(CartService) {
      this.cartService = CartService;
    }
  
    async addToCart(req, res) {
      const { userId, productId, quantidade } = req.body;
      try {
        const cartItem = await this.cartService.addToCart(userId, productId, quantidade);
        res.status(201).json(cartItem);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  
    async removeFromCart(req, res) {
        const { userId, cartItemId } = req.params;
        try {
          const result = await this.cartService.removeFromCart(userId, cartItemId);
          res.status(200).json(result);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
    }
  
    async getCart(req, res) {
        const userId = req.params.userId;
        try {
          const cart = await this.cartService.getCart(userId);
          if (cart) {
            res.status(200).json(cart);
          } else {
            res.status(404).json({ error: 'Carrinho não encontrado' });
          }
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
    }
  }
  
  module.exports = CartController;