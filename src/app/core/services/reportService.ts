import { fetchClient } from "@/app/lib/fetchClient";
import { Report, ReportReq } from "../models/report-interface";
import axios from "axios";

export const findReportPublic = async (code: string): Promise<Report | null> => {
  try {
    const response = await axios.get<Report>(`http://localhost:3000/api/report/public/${code}`);
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

export const findReportSimple = async (): Promise<Report[]> => {

  try {
    const response = await fetchClient(
      "http://localhost:3000/api/report/simple",
      { method: "GET" }
    );

    const data = await response.json();

    return data.data || [];

  } catch (error) {
    return [];
  }
};

export const findReportSimpleComplet = async (): Promise<Report[]> => {

  try {
    const response = await fetchClient(
      "http://localhost:3000/api/report/complet",
      { method: "GET" }
    );

    const data = await response.json();

    return data.data || [];

  } catch (error) {
    return [];
  }
};