export interface DataOccurrence {
    count: number;
    occurrences: Occurrence[];
  }
  
  export interface Occurrence {
    description: string;
    createdAt: string;
    updatedAt: string;
    status: string;
  }