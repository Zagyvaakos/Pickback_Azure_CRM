export interface AzureTask {
    id: number;
    name: string;
    description: string;
    status: AzureTaskStatusType;
    type: number;
    title: string;
    createdUserId: number;
    createdDateUtc: Date;
    companyId: number;
}

export enum AzureTaskType {
    BUG,
    FEATURE,
    USERSTORY,
}
export enum AzureTaskStatusType {
    STOPPED = 0,
    ERROR = 1,
    DONE = 2,
    NEW = 3,

}