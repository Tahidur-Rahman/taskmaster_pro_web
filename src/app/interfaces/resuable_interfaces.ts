export interface userDataInterface {
    username: string;
    email: string;
    id: string;
    profilePic: string;
}
export interface projectInterface {
    adminEmail: string;
    adminId: string;
    adminName: string;
    pDesc: string;
    pId: string;
    pImage: string;
    pName: string;
    pTime: string;
    assignedTo: string[];
    createdAt: number;
    updatedAt: number;
}
export interface taskInterface {
    creatorId: string;
    description: string;
    dueDate: string;
    taskId: string;
    title: string;
    createdAt: number;
    updatedAt: number;
}
