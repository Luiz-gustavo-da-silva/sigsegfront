"use client";

import Link from "next/link";
import { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

interface Report {
  nome: string;
  descricao: string;
}

export default function Home() {
  const [showFilters, setShowFilters] = useState(false);
  const [categoria, setCategoria] = useState("Denuncias");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("todos");
  const [cnpj, setCnpj] = useState("");
  const [report, setReport] = useState<Report[]>([]);

  const totalElementos = report.length;

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const limparFiltros = () => {
    setSearch("");
    setStatus("todos");
    setCnpj("");
  };

  return (
    <div className="min-h-screen">
      <header className="flex justify-between items-center py-4 px-6">
        <h1 className="text-xl font-bold text-[#378c77]">SIG-SEG</h1>

        <nav className="hidden lg:flex gap-6">
          <a href="#" className="text-[#378c77] font-bold">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Sobre mim
          </a>
        </nav>

        <div className="flex gap-6">
          <Link
            href="/signup"
            className="text-black px-4 py-2 rounded-lg hover:text-[#378c77]"
          >
            Sign Up
          </Link>

          <Link
            href="/login"
            className="bg-[#378c77] text-white px-4 py-2 rounded-lg"
          >
            Login
          </Link>
        </div>
      </header>

      <div className="m-6 mt-0 bg-gray-50 rounded-lg p-6 py-10 text-center">
        <h2 className="text-2xl font-bold">
          Busque por{" "}
          <span className="underline text-[#378c77]">
            Denuncias ou Ocorrências
          </span>
        </h2>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <div className="relative w-full sm:w-1/3">
            <input
              type="text"
              placeholder="Ex.: Roubo"
              className="border border-gray-300 rounded-lg pl-10 py-2 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-[50%] transform -translate-y-1/2 text-gray-500" />
          </div>
          <button
            className="border border-gray-300 bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={toggleFilters}
          >
            <FaFilter className="text-gray-500" /> Filtros
          </button>
          <button className="text-white px-6 py-2 rounded-lg bg-[#378c77]">
            Buscar
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap justify-center gap-4 bg-white py-4 px-6 shadow rounded-lg mt-4">
            <select
              className="border border-gray-300 rounded-lg px-2 py-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="ativos">Ativos</option>
              <option value="fechados">Fechados</option>
            </select>
            <input
              type="text"
              placeholder="CNPJ"
              className="border border-gray-300 rounded-lg px-2 py-2"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
            <button className="text-[#378c77]" onClick={limparFiltros}>
              Limpar
            </button>
          </div>
        )}
      </div>

      <div className="flex align-center p-6">
        <h1 className="text-1xl font-bold">
          {totalElementos} {categoria}
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {report.map((report, index) => (
          <div
            key={index}
            className="flex flex-col h-full border p-4 rounded-lg"
          >
            <h3 className="text-lg font-bold">{report.nome}</h3>
            <p>{report.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
