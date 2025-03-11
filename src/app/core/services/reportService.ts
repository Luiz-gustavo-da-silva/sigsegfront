import { Report, ReportReq } from "../models/report-interface";
import axios from "axios";

export const findReportPublic = async (code: string): Promise<Report | null> => {
  try {
    const response = await axios.get<Report>(`http://localhost:3000/api/report/${code}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const createReport = async (report: ReportReq): Promise<Report> => {
  try {
    const response = await axios.post<Report>("http://localhost:3000/api/report", report);
    return response.data;
  } catch (error) {
    throw new Error("Não foi possível criar a denúncia. Tente novamente.");
  }
};
