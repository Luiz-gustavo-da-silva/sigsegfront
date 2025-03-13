"use client";

import ModalOccurrence from "@/app/components/modalOccurrence";
import { FilterOccurrencePrivate } from "@/app/core/models/filterOccurrence-interface";
import { Occurrence } from "@/app/core/models/occurrence-interface";
import { DeleteOccurrence, findAllOccurrencePrivate } from "@/app/core/services/occurrenceService";
import { findReportSimpleComplet } from "@/app/core/services/reportService";
import { notification, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Report } from "@/app/core/models/report-interface";
import { statusOccurrenceColors } from "@/app/core/models/statusColor";


export default function OccurrencePage() {
  const [filters, setFilters] = useState<FilterOccurrencePrivate>({
    description: "",
    status: "",
    title: "",
    reportId: null,
    userId: null,
  });

  const [loading, setLoading] = useState(true);
  const [occurrence, setOccurrence] = useState<Occurrence[]>([]);
  const [countOccurrence, setCountOccurrence] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedOccurrence, setSelectedOccurrence] = useState<Occurrence | null>(null);
  const [api, contextHolder] = notification.useNotification();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOccurrence(filters);
  };

  const handleClear = () => {
    setFilters({
      description: "",
      status: "",
      title: "",
      reportId: null,
      userId: null,
    });
    fetchOccurrence({
      description: "",
      status: "",
      title: "",
      reportId: null,
      userId: null,
    });
  };

  useEffect(() => {
    fetchOccurrence(filters);
    fetchDataReportSimple();
  }, []);

  const fetchDataReportSimple = async () => {
    const response = await findReportSimpleComplet();
    setReports(response);
  };

  const fetchOccurrence = async (filters: FilterOccurrencePrivate) => {
    setLoading(true);
    const data = await findAllOccurrencePrivate(filters);
    setOccurrence(data?.occurrences ?? []);
    setCountOccurrence(data?.count ?? 0);
    setLoading(false);
  };

  const columns: ColumnsType<Occurrence> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Título", dataIndex: "title", key: "title" },
    { title: "Descrição", dataIndex: "description", key: "description" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: keyof statusOccurrenceColors) => {
        const statusColors: statusOccurrenceColors = {
          OPEN: "blue",
          IN_PROGRESS: "orange",
          CLOSED: "green",
        };
        return <Tag color={statusColors[status] || "default"}>{status}</Tag>;
      },
    },
    {
      title: "Data de Criação",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString("pt-BR"),
    },
    { title: "Autor", dataIndex: ["user", "name"], key: "user" },
    { title: "Denúncia", dataIndex: ["report", "titleReport"], key: "report" },
    {
      title: "",
      key: "actions",
      render: (_, record) => (
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-md transition"
          onClick={() => handleEdit(record)}
        >
          Editar
        </button>
      ),
    },{
      title: "",
      key: "actions",
      render: (_, record) => (
        <button
          className="bg-red-500 text-white px-3 py-1 rounded-md transition"
          onClick={() => handleDelete(record.id)}
        >
          Deletar
        </button>
      ),
    },
  ];

  const handleEdit = (occurrence: Occurrence) => {
    setSelectedOccurrence(occurrence);
    setModalVisible(true);
  };

  const handleCreate = () => {
    setSelectedOccurrence(null);
    setModalVisible(true);
  };


  const handleDelete = async (id: number) => {
    try {
      await DeleteOccurrence(id);
  
      api.success({
        message: "Ocorrência deletada",
        description: "A ocorrência foi removida com sucesso!",
      });
  
      fetchOccurrence(filters);
    } catch (error) {
      api.error({
        message: "Erro ao deletar ocorrência",
        description: "Tente novamente mais tarde.",
      });
    }
  };
  const handleModalClose = () => {
    setModalVisible(false);
    fetchOccurrence({
      description: "",
      status: "",
      title: "",
      reportId: null,
      userId: null,
    });
  };

  return (
    <div className="bg-white p-3 h-full">
      {contextHolder}
      <div className="flex align-center justify-between bg-gray-50 py-3 px-2">
        <h1 className="text-2xl font-bold">Ocorrências</h1>
        <button
          className="text-white px-6 py-2 rounded-lg bg-[#3065ac]"
          onClick={() => handleCreate()}
        >
          + Ocorrência
        </button>
      </div>

      <form onSubmit={handleSearch} className="bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-3 px-2">
          <input
            type="text"
            placeholder="Título da ocorrência"
            name="title"
            value={filters.title}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full"
          />
          <input
            type="text"
            placeholder="Descrição da ocorrência"
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
            <option value="OPEN">Aberta</option>
            <option value="IN_PROGRESS">Em Progresso</option>
            <option value="CLOSED">Fechada</option>
          </select>

          <select
            name="reportId"
            id="reportId"
            value={filters.reportId || ""}
            onChange={handleFilterChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Selecione um relatório</option>
            {reports.map((report) => (
              <option key={report.id} value={report.id}>
                {report.titleReport || "Sem título"}
              </option>
            ))}
          </select>
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
          pagination={{ pageSize: 10, total: countOccurrence }}
        />
      </div>

      <ModalOccurrence open={modalVisible} onClose={handleModalClose} occurrence={selectedOccurrence}/>
    </div>
  );
}
