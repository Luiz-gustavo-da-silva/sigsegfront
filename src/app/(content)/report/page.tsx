"use client";

import { FilterReportPrivate } from "@/app/core/models/filterReport-interface";
import { Report } from "@/app/core/models/report-interface";
import { statusReportColors } from "@/app/core/models/statusColor-interface";
import { statusReportTranslation } from "@/app/core/models/statusTradution-interface";
import { findAllReportPrivate } from "@/app/core/services/reportService";
import { InputMask } from "@react-input/mask";
import { Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

export default function ReportPage() {
  const [filters, setFilters] = useState<FilterReportPrivate>({
    description: "",
    status: "",
    reporterName: "",
    CPF: "",
    addressReport: "",
    cityReport: "",
    UFReport: "",
    countryReport: "",
    titleReport: "",
  });

  const [occurrence, setOccurrence] = useState<Report[]>([]);
  const [countReport, setCountReport] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFilters({
      description: "",
      status: "",
      reporterName: "",
      CPF: "",
      addressReport: "",
      cityReport: "",
      UFReport: "",
      countryReport: "",
      titleReport: "",
    });
    fetchReport({
      description: "",
      status: "",
      reporterName: "",
      CPF: "",
      addressReport: "",
      cityReport: "",
      UFReport: "",
      countryReport: "",
      titleReport: "",
    });
  };

  useEffect(() => {
    fetchReport(filters);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchReport(filters);
  };

  const fetchReport = async (filters: FilterReportPrivate) => {
    setLoading(true);
    const data = await findAllReportPrivate(filters);
    setOccurrence(data?.data ?? []);
    setCountReport(data?.count ?? 0);
    setLoading(false);
  };

  const columns: ColumnsType<Report> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Título", dataIndex: "titleReport", key: "titleReport" },
    { title: "Descrição", dataIndex: "description", key: "description" },
    { title: "Endereço", dataIndex: "addressReport", key: "addressReport" },
    { title: "Cidade", dataIndex: "cityReport", key: "cityReport" },
    { title: "UF", dataIndex: "UFReport", key: "UFReport" },
    { title: "País", dataIndex: "countryReport", key: "countryReport" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: keyof statusReportColors) => {
        const statusColors: statusReportColors = {
          PENDING: "blue",
          UNDER_REVIEW: "orange",
          CONVERTED_TO_OCCURRENCE: "green",
        };
        return <Tag color={statusColors[status] || "default"}>{statusReportTranslation[status]}</Tag>;
      },
    },
    { title: "Autor", dataIndex: "reporterName", key: "Autor" },
    { title: "CPF", dataIndex: "CPF", key: "CPF" },
    {
      title: "Data de Criação",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString("pt-BR"),
    },
  ];

  return (
    <div className="bg-white p-3 h-full">
      <div className="flex align-center justify-between bg-gray-50 py-3 px-2">
        <h1 className="text-2xl font-bold">Denúncias</h1>
      </div>

      <form onSubmit={handleSearch} className="bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 py-3 px-2">
          <input
            type="text"
            placeholder="Título da Denúncias"
            name="titleReport"
            value={filters.titleReport}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full"
          />
          <input
            type="text"
            placeholder="Descrição da Denúncias"
            name="description"
            value={filters.description}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          />

          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full"
          >
            <option value="">Selecione o status</option>
            <option value="PENDING">Pendente</option>
            <option value="UNDER_REVIEW">Em Análise</option>
            <option value="CONVERTED_TO_OCCURRENCE">
              Convertido para Ocorrência
            </option>
          </select>

          <input
            type="text"
            placeholder="Endereço da Denúncias"
            name="addressReport"
            value={filters.addressReport}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full"
          />
          <input
            type="text"
            placeholder="Cidade da Denúncias"
            name="cityReport"
            value={filters.cityReport}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          />

          <input
            type="text"
            placeholder="UF da Denúncias"
            name="UFReport"
            value={filters.UFReport}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          />

          <input
            type="text"
            placeholder="`País da Denúncias"
            name="countryReport"
            value={filters.countryReport}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          />

          <input
            type="text"
            placeholder="Nome do Autor"
            name="reporterName"
            value={filters.reporterName}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          />

          <InputMask
            type="text"
            placeholder="CPF do Autor"
            name="CPF"
            mask="___.___.___-__"
              replacement={{ _: /\d/ }}
            value={filters.CPF}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          />   
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center py-3 gap-3">
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 text-black rounded-md transition w-full sm:w-auto"
          >
            Limpar
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-[#3065ac] text-white rounded-md transition w-full sm:w-auto"
          >
            Buscar
          </button>
        </div>
      </form>

      <div className="mt-5 overflow-auto">
        <Table
          columns={columns}
          dataSource={occurrence}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10, total: countReport }}
        />
      </div>
    </div>
  );
}
