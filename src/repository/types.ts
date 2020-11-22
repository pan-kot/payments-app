export type ContractDto = {
  description: string;
};

export type PaymentDto = {
  contractId: number;
  description: string;
  value: number;
  time: Date;
  isImported: boolean;
};
