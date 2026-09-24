export type ValveType = 'forged' | 'cast' | 'not-sure' | '';

export interface RFQData {
  valveType: ValveType;
  size: string;
  pressureClass: string;
  quantity: number | '';
  materialConstruction?: string;
  endConnection?: string;
  applicationMedia?: string;
  specialRequirements?: string;
  files: File[];
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  countryCode: string;
  country?: string;
  city?: string;
}

export interface RFQErrors {
  valveType?: string;
  size?: string;
  pressureClass?: string;
  quantity?: string;
  fullName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
}

export interface SubmissionResult {
  success: boolean;
  rfqReference: string;
  submittedAt: Date;
}
