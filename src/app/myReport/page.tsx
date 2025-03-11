"use client";

import { useState } from "react";
import Header from "../components/header";
import { findReportPublic } from "../core/services/reportService";
import { Report } from "../core/models/report-interface";
import { FaSearch } from "react-icons/fa";

export default function MyReport() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOccurrence();
  };

  const fetchOccurrence = async () => {
    if (!code.trim()) return;
    setLoading(true);
    const data = await findReportPublic(code);

    if(data){
      setReport(data as Report);
      setError("");
    }else{
      setReport(null);
      setError("Nenhuma denuncia encontrada para o código informado.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <Header />

      <form onSubmit={handleSearch}>
        <div className="m-6 mt-0 bg-gray-50 rounded-lg p-6 py-10 text-center">
          <h2 className="text-2xl font-bold">
            Busque por{" "}
            <span className="underline text-[#378c77]">Denuncia</span>
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
              />
              <FaSearch className="absolute left-3 top-[50%] transform -translate-y-1/2 text-gray-500" />
            </div>
            <button
              className="text-white px-6 py-2 rounded-lg bg-[#378c77]"
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
        <button className="text-white px-6 py-2 rounded-lg bg-[#378c77]">+ Denuncia</button>
      </div>

      {error && (
        <div className="m-6 bg-red-100 text-red-700 p-4 rounded-lg text-center">
          {error}
        </div>
      )}

      {report && (
        <div className="m-6 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold">Detalhes da Ocorrência</h3>
          <p><strong>Código:</strong> {report.code}</p>
          <p><strong>Status:</strong> {report.status}  </p>
          <p><strong>Descrição:</strong> {report.description}</p>
          <p><strong>Criado em:</strong> {new Date(report.createdAt).toLocaleString()}</p>
          <p><strong>Última atualização:</strong> {new Date(report.updatedAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
