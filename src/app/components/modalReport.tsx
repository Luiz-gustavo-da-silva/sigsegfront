import { Modal, notification } from "antd";
import { useState } from "react";
import { createReport } from "../core/services/reportService";
import { ReportReq } from "../core/models/report-interface";
import { InputMask } from '@react-input/mask';

interface ReportModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: { description: string }) => void;
}

const ModalReport: React.FC<ReportModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [formData, setFormData] = useState<ReportReq>({
    reporterName: "",
    CPF: "",
    telephone: "",
    address: "",
    email: "",
    addressReport: "",
    cityReport: "",
    UFReport: "",
    countryReport: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    try {
      const report: any = await createReport(formData);
      api.success({
        message: "Cadastro realizado com sucesso!",
        description: (
          <div>
            <p>O código do seu report é:</p>
            <span
              style={{ fontWeight: "bold", fontSize: "16px", color: "#1890ff" }}
            >
              {report.code}
            </span>
            <p>Salve esse código antes de fechar!</p>
          </div>
        ),
        duration: 0,
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

  return (
    <Modal
      title="Cadastro de Denúncia"
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      {contextHolder}
      <form onSubmit={handleSubmit}>
        <h2 className="text-1xl font-bold mb-3">Informações do Denunciante</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">
              Nome do Denunciante
            </label>
            <input
              type="text"
              name="reporterName"
              value={formData.reporterName}
              onChange={handleChange}
              placeholder="Ex. Luiz Gustavo"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              CPF do Denunciante
            </label>
            <InputMask
              mask="___.___.___-__" 
              replacement={{ _: /\d/ }}
              name="CPF"
              placeholder="Ex. 123.456.789-12"
              value={formData.CPF}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Telefone do Denunciante</label>
            <InputMask
              mask="(__) _ ____-____" 
              replacement={{ _: /\d/ }}
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="Ex. (40) 0289-9220"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Endereço do Denunciante</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              placeholder="Ex. Rua josé Salustiano"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Email do Denunciante</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Ex. exemplo@gmail.com"
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <h3 className="font-semibold mb-3">Informações da Denúncia</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Endereço da Denuncia</label>
            <input
              type="text"
              name="addressReport"
              placeholder="Ex. Rua mova"
              value={formData.addressReport}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Cidade da Denuncia</label>
            <input
              type="text"
              name="cityReport"
              placeholder="Ex. Natal"
              value={formData.cityReport}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">UF da Denuncia</label>
            <input
              type="text"
              name="UFReport"
              placeholder="Ex. RN"
              value={formData.UFReport}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">País da Denuncia</label>
            <input
              type="text"
              name="countryReport"
              placeholder="Ex. Brasil"
              value={formData.countryReport}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Descrição da Denuncia</label>
          <textarea
            name="description"
            placeholder="Ex. Fogo"
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
            className="px-4 py-2 bg-[#378c77] text-white rounded"
          >
            {loading ? "Carregando..." : "Cadastrar"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalReport;
