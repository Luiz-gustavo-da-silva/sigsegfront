export interface DataOccurrence {
  count: number;
  occurrences: Occurrence[];
}

export interface Occurrence {
  id: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  title?: string | null;
  report: Report;
  user: User;
}

export interface Report {
  id: number;
  userId: number | null;
  code: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  reporterName: string;
  CPF?: string | null;
  telephone?: string | null;
  address?: string | null;
  email?: string | null;
  addressReport?: string | null;
  cityReport?: string | null;
  UFReport?: string | null;
  countryReport?: string | null;
  titleReport?: string | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface OccurrenceReq {
  id?: number,
	reportId: number | null,
	userId: number | null,
	description: string,
	title: string,
	status: string
}