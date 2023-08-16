export interface empInfo {
    Id: number;
    empId: number
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    address: string;
    dateOfBirth: string;
    deptInchargeCode: string;
    role: string;
    category: string;
    joiningDate: Date;
}
export interface leavesData {
    Id: number;
    empInfoId: number
    empType: string;
    annualLeaves: string;
    casualLeave: string;
    sickLeave: string;
    StartingDate: Date;
    ClosingDate: Date;
}
export interface applyLeave {
    Id: number;
    empInfoId: number
    leaveType: string;
    fromDate: Date;
    todate: Date;
    fromSession: string;
    toSession: string;
    description: string;
    applyTo: string;
}
export interface employeeLeaveMaster {
    Id: number;
    empInfoId: number
    empType: string;
    annualLeaves: string;
    casualLeave: string;
    sickLeave: string;
    StartingDate: Date;
    ClosingDate: Date;
}
export interface applyLeave {
    Id: number;
    empInfoId: number
    leaveType: string;
    fromDate: Date;
    todate: Date;
    leaveSession: string;
    fromSession: string;
    toSession: string;
    description: string;
    applyTo: string;
    status: string;
    leaveDays: bigint;
    modifiedByID:number;
}
export interface User {
    UserId: number;
    empInfoId: number
    roleId: number
    Email: string;
    Password: string;
    IsLocked: boolean;
    IsLockDuration: Date;
    Attempts: number;
    ContactNumber: string;
    IsActive: boolean;
    ExpiryDate: Date;
    CreatedOn: Date;
    AccountGroup: string;
}
export interface Role {
    Id: number;
    RoleName: string;
    IsActive: boolean;
    CreatedOn: Date;
}
