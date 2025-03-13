"use client";
import { useState, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { findAllOccurrencePublic } from "./core/services/occurrenceService";
import { Occurrence } from "./core/models/occurrence-interface";
import { FilterOccurrence } from "./core/models/filterOccurrence-interface";
import Header from "./components/header";

export default function Home() {
  const [showFilters, setShowFilters] = useState(false);
  const [occurrence, setOccurrence] = useState<Occurrence[]>([]);
  const [countReport, setCountOccurrence] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOccurrence>({
    description: "",
    status: "",
    title: ""
  });

  useEffect(() => {
    fetchOccurrence(filters);
  }, []);

  const fetchOccurrence = async (filters: FilterOccurrence) => {
    setLoading(true);
    const data = await findAllOccurrencePublic(filters);
    setOccurrence(data?.occurrences ?? []);
    setCountOccurrence(data?.count ?? 0);
    setLoading(false);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const limparFiltros = () => {
    setFilters({
      description: "",
      status: "",
      title: ""
    });
    fetchOccurrence({
      description: "",
      status: "",
      title: ""
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOccurrence(filters);
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
            <span className="underline text-[#3065ac]">Ocorrências</span>
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="relative w-full sm:w-1/3">
              <input
                type="text"
                placeholder="Ex.: Roubo"
                name="description"
                value={filters.description}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded-lg pl-10 py-2 w-full"
              />
              <FaSearch className="absolute left-3 top-[50%] transform -translate-y-1/2 text-gray-500" />
            </div>
            <button
              type="button"
              className="border border-gray-300 bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2"
              onClick={toggleFilters}
            >
              <FaFilter className="text-gray-500" /> Filtros
            </button>
            <button
              className="text-white px-6 py-2 rounded-lg bg-[#3065ac]"
              type="submit"
            >
              Buscar
            </button>
          </div>

          {showFilters && (
            <div className="flex flex-wrap justify-center gap-4 bg-white py-4 px-6 shadow rounded-lg mt-4">
              <select
                id="status"
                name="status"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="mt-1 block px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Selecione o status</option>
                <option value="OPEN">Aberta</option>
                <option value="IN_PROGRESS">Em Progresso</option>
                <option value="CLOSED">Fechada</option>
              </select>

              <input
                  id="title"
                  type="text"
                  placeholder="Título da ocorrência"
                  name="title"
                  value={filters.title}
                  onChange={handleFilterChange}
                  className="mt-1 block px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />

              <button className="text-[#3065ac]" onClick={limparFiltros}>
                Limpar
              </button>
            </div>
          )}
        </div>
      </form>

      <div className="flex align-center p-6">
        <h1 className="text-1xl font-bold">{countReport} Ocorrências</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          occurrence.map((o, index) => (
            <div key={index} className="flex flex-col h-full">
              <div className="bg-white border border-gray-300 rounded-lg shadow p-4 flex flex-col h-full">
                <div className="flex items-center gap-4">
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-white font-bold overflow-hidden bg-[#3065ac]">
                  {firstCode(o.title ? o.title : '-')}
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{o.title ? o.title : '-'}</h3>
                    <p className="text-gray-500 text-sm">
                      {o.status === "OPEN"
                        ? "Aberto"
                        : o.status === "IN_PROGRESS"
                        ? "Em Progresso"
                        : o.status === "CLOSED"
                        ? "Fechado"
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                      o.status === "OPEN"
                        ? "bg-red-100 text-red-700"
                        : o.status === "IN_PROGRESS"
                        ? "bg-yellow-100 text-yellow-700"
                        : o.status === "CLOSED"
                        ? "bg-green-100 text-green-700"
                        : ""
                    }`}
                  >
                    {o.status === "OPEN"
                      ? "Aberto"
                      : o.status === "IN_PROGRESS"
                      ? "Em Progresso"
                      : o.status === "CLOSED"
                      ? "Fechado"
                      : ""}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-4">
                  <span className="text-1xl font-bold">Descrição:</span> {o.description}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="text-1xl font-bold">Criado em: </span>
                  {new Date(o.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="text-1xl font-bold">Última atualização</span>
                  {new Date(o.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
