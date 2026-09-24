export type ValveType = 'forged' | 'cast' | 'not-sure' | '';

export interface RFQData {
  valveType: ValveType;
  size: string;
  otherSize?: string;
  pressureClass: string;
  otherPressureClass?: string;
  quantity: number | '';
  materialConstruction?: string;
  otherMaterialConstruction?: string;
  endConnection?: string;
  otherEndConnection?: string;
  applicationMedia?: string;
  otherApplicationMedia?: string;
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
  otherSize?: string;
  pressureClass?: string;
  otherPressureClass?: string;
  otherMaterialConstruction?: string;
  otherEndConnection?: string;
  otherApplicationMedia?: string;
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
