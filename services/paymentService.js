const db = require('../models');

class PaymentService {
  constructor(TransactionModel, CartService) {
    this.Transaction = TransactionModel;
    this.cartService = CartService;
  }

  async processCreditCardPayment(userId, cardNumber, expirationDate, cvv) {
    // Simulação de validação do cartão
    if (cardNumber.length !== 16 || cvv.length !== 3) {
      throw new Error('Dados do cartão inválidos');
    }

    const cart = await this.cartService.getCart(userId);
    if (!cart || cart.items.length === 0) {
      throw new Error('Carrinho vazio');
    }

    const transaction = await this.Transaction.create({
      userId,
      valorTotal: cart.valorTotal,
      metodoPagamento: 'cartao_credito',
      status: 'concluido'
    });

    await this.cartService.clearCart(userId);

    return { transactionId: transaction.id };
  }

  async processPixPayment(userId, pixKey) {
    // Simulação de validação da chave PIX
    if (!pixKey || pixKey.length < 5) {
      throw new Error('Chave PIX inválida');
    }

    const cart = await this.cartService.getCart(userId);
    if (!cart || cart.items.length === 0) {
      throw new Error('Carrinho vazio');
    }

    // Simulação de processamento do pagamento PIX
    const pixPaymentSuccessful = this.simulatePixPayment(pixKey, cart.valorTotal);
    if (!pixPaymentSuccessful) {
      throw new Error('Falha no processamento do pagamento PIX');
    }

    const transaction = await this.Transaction.create({
      userId,
      valorTotal: cart.valorTotal,
      metodoPagamento: 'pix',
      status: 'concluido'
    });

    await this.cartService.clearCart(userId);

    return { transactionId: transaction.id };
  }

  simulatePixPayment(pixKey, amount) {
    // Simulação simples de processamento PIX
    console.log(`Processando pagamento PIX de R$ ${amount} para a chave ${pixKey}`);
    return Math.random() > 0.1; // 90% de chance de sucesso
  }

  async getTransactionStatus(transactionId) {
    try {
      const transaction = await this.Transaction.findByPk(transactionId);
      if (!transaction) throw new Error('Transação não encontrada');
      return transaction;
    } catch (error) {
      throw error;
    }
  }

  async getTransactionById(transactionId) {
    try {
      const transaction = await this.Transaction.findByPk(transactionId);
      if (!transaction) {
        throw new Error('Transação não encontrada');
      }
      return {
        id: transaction.id,
        userId: transaction.userId,
        valorTotal: transaction.valorTotal,
        metodoPagamento: transaction.metodoPagamento,
        status: transaction.status,
        createdAt: transaction.createdAt
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PaymentService;