import { fetchClient } from "@/app/lib/fetchClient";
import { DataReport, Report, ReportReq } from "../models/report-interface";
import axios from "axios";
import { FilterReportPrivate } from "../models/filterReport-interface";

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

export const findAllReportPrivate = async (filter: FilterReportPrivate): Promise<DataReport> => {
  try {
    const queryParams = new URLSearchParams();

    if (filter.description) queryParams.append("description", filter.description);
    if (filter.status) queryParams.append("status", filter.status);
    if (filter.titleReport) queryParams.append("titleReport", filter.titleReport);
    if (filter.reporterName) queryParams.append("reporterName", filter.reporterName);
    if (filter.CPF) queryParams.append("CPF", filter.CPF);
    if (filter.addressReport) queryParams.append("addressReport", filter.addressReport);
    if (filter.cityReport) queryParams.append("cityReport", filter.cityReport);
    if (filter.UFReport) queryParams.append("UFReport", filter.UFReport);
    if (filter.countryReport) queryParams.append("countryReport", filter.countryReport);


    const response = await fetchClient(
      `http://localhost:3000/api/report?${queryParams.toString()}`,
      { method: "GET" }
    );

    const data = await response.json();

    return data || { count: 0, data: [] };
  } catch (error) {
    return { count: 0, data: [] };
  }
};
