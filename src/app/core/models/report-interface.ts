export interface DataReport {
  count: number;
  data: Report[];
}

export interface Report {
  code: string;
  status: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  occurrence?: string | null;
  addressReport?: string | null;
  cityReport?: string | null;
  UFReport?: string | null;
  countryReport?: string | null;
}