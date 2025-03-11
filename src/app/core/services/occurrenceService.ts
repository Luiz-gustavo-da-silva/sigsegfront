import { FilterOccurrence } from "../models/filterOccurrence-interface";
import { DataOccurrence } from "../models/occurrence-interface";

export const findAllOccurrencePublic = async (filter: FilterOccurrence): Promise<DataOccurrence> => {

  try {
    const queryParams = new URLSearchParams();

    if (filter.description)
      queryParams.append("description", filter.description);
    if (filter.status) queryParams.append("status", filter.status);

    const response = await fetch(
      `http://localhost:3000/api/occurrence/public?${queryParams.toString()}`
    );

    const data = await response.json();
    return data || [];
  } catch (error) {
    return { count: 0, occurrences: [] };
  }
};
