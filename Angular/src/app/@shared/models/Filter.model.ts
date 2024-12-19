export interface Filter {

    text: string,
    offset: number,
    limit: number,
    sortField: string,
    sortDirection: string,
    companyIds: number[],
    statuses: number[],
    types: number[],
    createdUser: { id: number },
}