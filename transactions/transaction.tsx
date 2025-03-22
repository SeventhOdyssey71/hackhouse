import { Transaction } from '@mysten/sui/transactions';
 
const tx = new Transaction();
const [coin] = tx.splitCoins(tx.gas, [100]);

tx.transferObjects([coin], '0xf34864d12b5db7d1c03aec06a7b45b3be42ecba7729aa1d950e0183597d966ff');

