import { fetchClient } from "@/app/lib/fetchClient";
import { FilterOccurrence, FilterOccurrencePrivate } from "../models/filterOccurrence-interface";
import { DataOccurrence, Occurrence, OccurrenceReq } from "../models/occurrence-interface";
import { sessionIdUser } from "@/app/lib/session";

export const findAllOccurrencePublic = async (filter: FilterOccurrence): Promise<DataOccurrence> => {

  try {
    const queryParams = new URLSearchParams();

    if (filter.description)
      queryParams.append("description", filter.description);
    if (filter.status) queryParams.append("status", filter.status);
    if (filter.title) queryParams.append("title", filter.title);

    const response = await fetch(
      `http://localhost:3000/api/occurrence/public?${queryParams.toString()}`
    );

    const data = await response.json();
    return data || [];
  } catch (error) {
    return { count: 0, occurrences: [] };
  }
};

export const findAllOccurrencePrivate = async (filter: FilterOccurrencePrivate): Promise<DataOccurrence> => {
  try {
    const queryParams = new URLSearchParams();

    if (filter.description) queryParams.append("description", filter.description);
    if (filter.status) queryParams.append("status", filter.status);
    if (filter.title) queryParams.append("title", filter.title);
    if (filter.reportId) queryParams.append("reportId", String(filter.reportId));
    if (filter.userId) queryParams.append("userId", String(filter.userId));

    const response = await fetchClient(
      `http://localhost:3000/api/occurrence?${queryParams.toString()}`,
      { method: "GET" }
    );

    const data = await response.json();

    return data || { count: 0, occurrences: [] };
  } catch (error) {
    return { count: 0, occurrences: [] };
  }
};

export const createOccurrence = async (occurrence: OccurrenceReq): Promise<Occurrence> => {

  const id: number = await sessionIdUser();
  occurrence.userId = id;
  occurrence.reportId = Number(occurrence.reportId);

  try {
    const response = await fetchClient("http://localhost:3000/api/occurrence", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(occurrence),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Não foi possível criar a ocorrência. Tente novamente!");
  }
};
