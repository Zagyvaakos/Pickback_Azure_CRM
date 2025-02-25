export interface AzureTask {
    id: number;
    name: string;
    description: string;
    status: string;
    type: string;
    title: string;
    createdUserId: number;
    createdDateUtc: Date;
    companyId: number;
    company: any;
    createdUser: any;
    createdDate: Date;
    siteUrl: any;
    affectedVersion: any;
    fixedVersion: any;
    comments: any[];
    attachments: any[];
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