import { Report } from "../models/report-interface";

export const findReportPublic = async (
  code: string
): Promise<Report | null> => {
  try {
    const response = await fetch(`http://localhost:3000/api/report/${code}`);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data;

  } catch (error) {
    return null;
  }
};
