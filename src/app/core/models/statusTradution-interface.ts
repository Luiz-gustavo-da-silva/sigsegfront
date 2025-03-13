export const statusReportTranslation: statusReport = {
  PENDING: "Pendente",
  UNDER_REVIEW: "Em Revisão",
  CONVERTED_TO_OCCURRENCE: "Convertido para Ocorrência",
};

export interface statusReport {
  PENDING: string;
  UNDER_REVIEW: string;
  CONVERTED_TO_OCCURRENCE: string;
}

export const statusOccurrenceTranslation: statusOccurrence = {
  OPEN: "Aberta",
  IN_PROGRESS: "Em Progresso",
  CLOSED: "Fechada",
};

export interface statusOccurrence {
  OPEN: "Aberta";
  IN_PROGRESS: "Em Progresso";
  CLOSED: "Fechada";
}
