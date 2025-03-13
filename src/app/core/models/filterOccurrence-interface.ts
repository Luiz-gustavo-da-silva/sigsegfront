export interface FilterOccurrence{
    description: string;
    status: string;
    title: string;
}

export interface FilterOccurrencePrivate{
    description: string;
    status: string;
    title: string;
    reportId: number | null,
    userId: number | null
}