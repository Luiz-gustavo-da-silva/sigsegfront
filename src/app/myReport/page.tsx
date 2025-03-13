"use client";

import { useState } from "react";
import Header from "../components/header";
import { findReportPublic } from "../core/services/reportService";
import { Report } from "../core/models/report-interface";
import { FaSearch } from "react-icons/fa";
import ModalReport from "../components/modalReport";

export default function MyReport() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOccurrence();
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleReportSubmit = async (values: { description: string }) => {
    console.log("Denúncia cadastrada:", values);
  };

  const fetchOccurrence = async () => {
    if (!code.trim()) return;
    setLoading(true);
    const data = await findReportPublic(code);

    if (data) {
      setReport(data as Report);
      setError("");
    } else {
      setReport(null);
      setError("Nenhuma denuncia encontrada para o código informado.");
    }

    setLoading(false);
  };

  function firstCode(code: string){
    return code.charAt(0);
  }

  return (
    <div className="min-h-screen">
      <Header />

      <form onSubmit={handleSearch}>
        <div className="m-6 mt-0 bg-gray-50 rounded-lg p-6 py-10 text-center">
          <h2 className="text-2xl font-bold">
            Busque por{" "}
            <span className="underline text-[#3065ac]">Denuncia</span>
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="relative w-full sm:w-1/3">
              <input
                type="text"
                placeholder="Digite o código da denuncia"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="border border-gray-300 rounded-lg pl-10 py-2 w-full"
                required
              />
              <FaSearch className="absolute left-3 top-[50%] transform -translate-y-1/2 text-gray-500" />
            </div>
            <button
              className="text-white px-6 py-2 rounded-lg bg-[#3065ac]"
              type="submit"
              disabled={loading}
            >
              {loading ? "Buscando..." : "Buscar"}
            </button>
          </div>
        </div>
      </form>

      <div className="flex align-center p-6 justify-between">
        <h1 className="text-1xl font-bold">Denuncia</h1>
        <button
          className="text-white px-6 py-2 rounded-lg bg-[#3065ac]"
          onClick={() => setModalVisible(true)}
        >
          + Denuncia
        </button>
      </div>

      {error && (
        <div className="m-6 bg-red-100 text-red-700 p-4 rounded-lg text-center">
          {error}
        </div>
      )}

      {report && (
        <div className="bg-white border border-gray-300 rounded-lg shadow p-6 flex flex-col h-full w-full sm:w-1/2 lg:w-1/3 xl:w-1/3 mx-auto">
          <div className="flex items-center gap-4">
            <div
              className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-white font-bold overflow-hidden bg-[#3065ac]"
            >
              {firstCode(report.titleReport ? report.titleReport : "-" )}
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">{report.titleReport ? report.titleReport : "-" }</h3>
              <p className="text-gray-500 text-sm">
                {report.code}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                report.status === "PENDING"
                  ? "bg-red-100 text-red-700"
                  : report.status === "UNDER_REVIEW"
                  ? "bg-yellow-100 text-yellow-700"
                  : report.status === "CONVERTED_TO_OCCURRENCE"
                  ? "bg-green-100 text-green-700"
                  : ""
              }`}
            >
              {report.status === "PENDING"
                ? "Pendente"
                : report.status === "UNDER_REVIEW"
                ? "Em Revisão"
                : report.status === "CONVERTED_TO_OCCURRENCE"
                ? "Convertido em Ocorrência"
                : ""}
            </span>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            <span className="font-bold">Descrição:</span> {report.description}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-bold">Criado em:</span>{" "}
            {report.createdAt
              ? new Date(report.createdAt).toLocaleString()
              : "-"}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-bold">Última atualização:</span>{" "}
            {report.updatedAt
              ? new Date(report.updatedAt).toLocaleString()
              : "-"}
          </p>
        </div>
      )}

      <ModalReport
        open={modalVisible}
        onClose={handleModalClose}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
}
