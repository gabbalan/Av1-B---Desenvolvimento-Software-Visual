class PaymentController {
    constructor(PaymentService) {
      this.paymentService = PaymentService;
    }
  
    async processCreditCardPayment(req, res) {
      const { userId, cardNumber, expirationDate, cvv } = req.body;
      try {
        const result = await this.paymentService.processCreditCardPayment(userId, cardNumber, expirationDate, cvv);
        res.status(200).json({ message: 'Pagamento efetuado com sucesso', transactionId: result.transactionId });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  
    async processPixPayment(req, res) {
      const { userId, pixKey } = req.body;
      try {
        const result = await this.paymentService.processPixPayment(userId, pixKey);
        res.status(200).json({ 
          message: 'Pagamento PIX efetuado com sucesso', 
          transactionId: result.transactionId 
        });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  
    async getTransactionStatus(req, res) {
      const { transactionId } = req.params;
  
      try {
        const transaction = await this.paymentService.getTransactionStatus(transactionId);
        res.status(200).json(transaction);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  
    async getTransactionById(req, res) {
      const { transactionId } = req.params;
      try {
        const transaction = await this.paymentService.getTransactionById(transactionId);
        res.status(200).json(transaction);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    }
  }
  
  module.exports = PaymentController;