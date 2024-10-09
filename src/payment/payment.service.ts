import { Injectable } from '@nestjs/common';
import { JsonDB, Config } from 'node-json-db';
import { Account, Transaction } from '../generated/graphql';

@Injectable()
export class PaymentService {
  private db: JsonDB;

  constructor() {
    this.db = new JsonDB(new Config('paymentDatabase', true, false, '/'));
  }

  // 계정 생성
  createAccount(balance: number, currency: string): Account {
    const id = `account_${Date.now()}`;
    const newAccount: Account = { id, balance, currency };
    this.db.push(`/accounts/${id}`, newAccount);
    return newAccount;
  }

  // 모든 계정 조회
  async getAllAccounts(): Promise<Account[]> {
    const accounts: Account[] = await this.db.getData('/accounts');
    return accounts;
  }

  // 특정 계정 조회
  async getAccountById(id: string): Promise<Account> {
    try {
      const account: Account = await this.db.getData(`/accounts/${id}`);
      return account;
    } catch (error) {
      throw new Error(`Account with ID ${id} not found`);
    }
  }

  // 트랜잭션 생성
  createTransaction(
    fromAccount: string,
    toAccount: string,
    amount: number,
  ): Transaction {
    const id = `transaction_${Date.now()}`;
    const newTransaction: Transaction = {
      id,
      amount,
      status: 'pending',
      fromAccount,
      toAccount,
    };
    this.db.push(`/transactions/${id}`, newTransaction);
    return newTransaction;
  }

  // 트랜잭션 상태 업데이트
  async updateTransactionStatus(
    id: string,
    status: string,
  ): Promise<Transaction> {
    const transaction = await this.getTransactionById(id);
    transaction.status = status;
    this.db.push(`/transactions/${id}`, transaction);
    return transaction;
  }

  // 특정 트랜잭션 조회
  async getTransactionById(id: string): Promise<Transaction> {
    try {
      const transaction = await this.db.getData(`/transactions/${id}`);
      return transaction;
    } catch (error) {
      throw new Error(`Transaction with ID ${id} not found`);
    }
  }
}
