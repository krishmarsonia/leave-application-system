import { User } from "./User";

export interface Leaves {
  approved: boolean;
  cancelled: boolean;
  createdAt: string;
  employeeId: string | User;
  endDate: number;
  leaveType: "selectedHours" | "fullDay" | "SeveralDays";
  reason: string;
  startDate: number;
  updatedAt: string;
  _id: string;
  approvedBy?: string | User;
}

export function isEmployeeIdAUser(employee: User | string): employee is User {
  return (employee as User)._id !== undefined;
}

export function isApprovedByAUser(admin: User | string): admin is User {
  return (admin as User)._id !== undefined;
}

// type employeeExcluded = Omit<Leaves, "employeeId">

// interface exmployeePopulated extends employeeExcluded {
// employeeId : User
// }
