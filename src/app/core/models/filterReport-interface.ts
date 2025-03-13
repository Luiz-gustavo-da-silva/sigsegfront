export interface FilterReport{
    code: string,
    description: string,
    status: string,
    addressReport: string,
    cityReport: string,
    UFReport: string,
    countryReport: string, 
}

export interface FilterReportPrivate{
    description: string,
    status: string
    reporterName: string,
    CPF: string,
    addressReport: string,
    cityReport: string,
    UFReport: string,
    countryReport: string,
    titleReport: string
}