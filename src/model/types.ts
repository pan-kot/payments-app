export type Contract = {
  id: number;
  description: string;
};

export type Payment = {
  id: number;
  contractId: number;
  description: string;
  value: number;
  time: Date;
  isImported: boolean;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};
