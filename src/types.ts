export enum Role {
  EMPLOYEE,
  MANAGER,
  CEO,
}

export enum DocumentType {
  EXPENSE,
  REQUISTION,
}

export enum DocumentStatus {
  PENDING,
  APPROVED,
  REJECTED,
}

export interface Document {
  id: string;
  type: DocumentType;
  description: string;
  amount: number;
  reviewer: Role | null;
  status: DocumentStatus;
}
