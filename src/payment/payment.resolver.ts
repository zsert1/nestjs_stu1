import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { Account, Transaction } from '../generated/graphql';

@Resolver('Payment')
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Query('getAccount')
  async getAccount(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Account> {
    return this.paymentService.getAccountById(id); // 비동기 메서드를 호출하므로 await는 필요 없습니다.
  }

  @Query('getAllAccounts')
  getAllAccounts(): Promise<Account[]> {
    return this.paymentService.getAllAccounts();
  }

  @Mutation('createAccount')
  createAccount(
    @Args('balance') balance: number,
    @Args('currency') currency: string,
  ): Account {
    return this.paymentService.createAccount(balance, currency);
  }

  @Mutation('createTransaction')
  createTransaction(
    @Args('fromAccount') fromAccount: string,
    @Args('toAccount') toAccount: string,
    @Args('amount') amount: number,
  ): Transaction {
    return this.paymentService.createTransaction(
      fromAccount,
      toAccount,
      amount,
    );
  }

  @Mutation('updateTransactionStatus')
  updateTransactionStatus(
    @Args('id') id: string,
    @Args('status') status: string,
  ): Promise<Transaction> {
    return this.paymentService.updateTransactionStatus(id, status);
  }
}
