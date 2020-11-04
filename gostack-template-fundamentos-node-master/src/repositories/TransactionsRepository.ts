import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';

}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    this.transactions.map(transaction =>{
      if (transaction.type === 'income'){
        income += transaction.value;
      }else{
        outcome += transaction.value
      }
      return transaction
    });
    const balance ={
      income, 
      outcome,
      total: income - outcome,
    }
    return balance
  }

  public create({title,value,type,}:TransactionDTO): Transaction {
    const transaction = new Transaction({title,type,value});
    this.transactions.push(transaction);
    return transaction
  }
}

export default TransactionsRepository;
