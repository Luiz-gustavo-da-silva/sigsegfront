export interface DataDashboard {
  reportStatus: {
    pending: number;
    underReview: number;
    convertedToOccurrence: number;
  };
  occurrenceStatus: {
    open: number;
    inProgress: number;
    closed: number;
  };
}
