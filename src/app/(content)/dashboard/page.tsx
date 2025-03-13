"use client";

import { DataDashboard } from "@/app/core/models/dashboard-interface";
import { findDataDashboard } from "@/app/core/services/dashboardService";
import { useEffect, useState } from "react";
import { Card, Typography } from "antd";
import {
  FileSyncOutlined,
  HourglassOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

export default function Dashboard() {
  const [dataDashboard, setDataDashboard] = useState<DataDashboard>();

  useEffect(() => {
    fetchDataDashboard();
  }, []);

  const fetchDataDashboard = async () => {
    const response = await findDataDashboard();
    setDataDashboard(response);
  };

  function reload(){
    fetchDataDashboard();
  }

  const cards = [
    {
      title: "Denúncias Pendentes",
      value: dataDashboard?.reportStatus.pending || 0,
      icon: <HourglassOutlined className="text-yellow-500 text-3xl" />,
    },
    {
      title: "Denúncias em Análise",
      value: dataDashboard?.reportStatus.underReview || 0,
      icon: <SyncOutlined className="text-blue-500 text-3xl" />,
    },
    {
      title: "Denúncias Convertidas",
      value: dataDashboard?.reportStatus.convertedToOccurrence || 0,
      icon: <FileSyncOutlined className="text-green-500 text-3xl" />,
    },
    {
      title: "Ocorrências Abertas",
      value: dataDashboard?.occurrenceStatus.open || 0,
      icon: <ExclamationCircleOutlined className="text-red-500 text-3xl" />,
    },
    {
      title: "Ocorrências em Andamento",
      value: dataDashboard?.occurrenceStatus.inProgress || 0,
      icon: <SyncOutlined className="text-blue-500 text-3xl" />,
    },
    {
      title: "Ocorrências Encerradas",
      value: dataDashboard?.occurrenceStatus.closed || 0,
      icon: <CheckCircleOutlined className="text-green-500 text-3xl" />,
    },
  ];

  return (
    <div className="p-6">

      <div className="flex align-center justify-between py-3 px-2">
        <h1 className="text-2xl font-bold">Painel de Controle</h1>
        <button
          className="text-white px-6 py-2 rounded-lg bg-[#3065ac]"
          onClick={() => reload()}
        >
          Recarregar
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card key={index} className="shadow-lg border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-4">
              {card.icon}
              <div>
                <p className="text-gray-600 text-lg">{card.title}</p>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
