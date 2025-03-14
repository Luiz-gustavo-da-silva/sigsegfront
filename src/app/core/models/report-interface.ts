export interface DataReport {
  count: number;
  data: Report[];
}

export interface Report {
  id?: number,
  code: string;
  status?: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  occurrence?: string | null;
  addressReport?: string | null;
  cityReport?: string | null;
  UFReport?: string | null;
  countryReport?: string | null;
  reporterName?: string,
  CPF?: string,
  telephone?: string,
  address?: string,
  email?: string,
  titleReport?: string
}

export interface ReportReq {
  description: string;
  addressReport: string;
  cityReport: string ;
  UFReport: string;
  countryReport: string;
  reporterName: string,
  CPF: string,
  telephone: string,
  address: string,
  email: string,
  titleReport: string
}