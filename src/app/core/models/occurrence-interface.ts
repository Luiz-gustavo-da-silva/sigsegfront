import { Report } from "./report-interface";
import { User } from "./user-interface";

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

export interface OccurrenceReq {
  id?: number,
	reportId: number | null,
	userId: number | null,
	description: string,
	title: string,
	status: string
}