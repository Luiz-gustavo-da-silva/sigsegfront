"use client";
import { Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { OccurrenceReq } from "../core/models/occurrence-interface";
import { createOccurrence } from "../core/services/occurrenceService";
import { findReportSimple } from "../core/services/reportService";
import { Report } from "../core/models/report-interface";

interface ReportModalProps {
  open: boolean;
  onClose: () => void;
}

const ModalOccurrence: React.FC<ReportModalProps> = ({
  open,
  onClose
}) => {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [reports, setReports] = useState<Report[]>([]);
  const [formData, setFormData] = useState<OccurrenceReq>({
    reportId: null,
    userId: null,
    description: "",
    title: "",
    status: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createOccurrence(formData);
      api.success({
        message: "Ocorrência cadastrada",
        description: "A ocorrência foi cadastrada com sucesso!",
      });
      onClose();
    } catch (error) {
      api.error({
        message: "Erro ao cadastrar",
        description: "Ocorreu um erro ao cadastrar o denuncia.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await findReportSimple();
    setReports(response);
  };

  return (
    <Modal
      title="Cadastro de Ocorrência"
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      {contextHolder}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">
              Selecione o Status da Ocorrência
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block  w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selecione o status</option>
              <option value="OPEN">Aberta</option>
              <option value="IN_PROGRESS">Em Progresso</option>
              <option value="CLOSED">Fechada</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Selecione a Denuncia
            </label>
            <select
              name="reportId"
              id="reportId"
              value={formData.reportId || ""}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selecione um relatório</option>
              {reports.map((report) => (
                <option key={report.id} value={report.id}>
                  {report.titleReport || "Sem título"}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">
            Título da Ocorrência
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex. Fogo"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">
            Descrição da Ocorrência
          </label>
          <textarea
            name="description"
            placeholder="Ex. Fogo lá em casa"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[#3065ac] text-white rounded"
          >
            {loading ? "Carregando..." : "Cadastrar"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalOccurrence;
