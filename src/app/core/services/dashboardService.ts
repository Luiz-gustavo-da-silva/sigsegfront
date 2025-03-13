import { fetchClient } from "@/app/lib/fetchClient";
import { DataDashboard } from "../models/dashboard-interface";

export const findDataDashboard = async (): Promise<DataDashboard> => {
  try {
    const response = await fetchClient(
      "http://localhost:3000/api/dashboard",
      { method: "GET" }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    return {
      reportStatus: {
        pending: 0,
        underReview: 0,
        convertedToOccurrence: 0,
      },
      occurrenceStatus: {
        open: 0,
        inProgress: 0,
        closed: 0,
      },
    };
  }
};
